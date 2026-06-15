/**
 * API THỐNG KÊ LỖI - Module Tính Toán Chi Tiết
 * 
 * Chức năng: Aggregation dữ liệu lỗi từ IndexedDB/Firestore
 * - Tính toán tỷ lệ lỗi
 * - Grouping theo khoa, phòng, bác sỹ
 * - Tính chi phí ảnh hưởng từ lỗi
 * - Trend analysis (xu hướng theo thời gian)
 * 
 * Author: Hệ thống CDSS
 * Date: 2026
 */

export class ApiThongKeLoi {
  /**
   * 1. THỐNG KÊ LỖI THEO KHOA/PHÒNG
   * 
   * @param {Array} listHoSo - Danh sách hồ sơ (mỗi hồ sơ có giam_dinh_5_tang.ket_qua_giam_dinh)
   * @param {String} khoa - Mã khoa (VD: 'NONI' = Nội khoa)
   * @param {Object} dateRange - {tuNgay: Date, denNgay: Date}
   * @returns {Object} - Thống kê khoa
   */
  static getThongKeLoiTheoKhoa(listHoSo, khoa, dateRange = null) {
    const hoSoKhoa = this._locHoSoTheoKhoa(listHoSo, khoa, dateRange);
    
    return {
      khoa: khoa,
      tongHoSo: hoSoKhoa.length,
      tongHoSoLoi: hoSoKhoa.filter(hs => this._coLoi(hs)).length,
      tyLeLoi: this._tinhTyLe(
        hoSoKhoa.filter(hs => this._coLoi(hs)).length,
        hoSoKhoa.length
      ),
      tongLoi: this._tongLoi(hoSoKhoa), // Tổng số lỗi (có thể > số hồ sơ lỗi)
      loiTheoLoai: this._groupLoiTheoLoai(hoSoKhoa),
      loiTheoQuyTac: this._groupLoiTheoQuyTac(hoSoKhoa),
      topBacSyLoi: this._getTopBacSyLoi(hoSoKhoa, 5),
      chiPhiBiAnhHuong: this._tinhChiPhiTheoKhoa(hoSoKhoa),
      xuHuongTheoThang: this._getXuHuongTheoThang(hoSoKhoa),
    };
  }

  /**
   * 2. THỐNG KÊ LỖI THEO BÁC SỸ
   * 
   * @param {Array} listHoSo - Danh sách hồ sơ
   * @param {String} bacSyId - Mã bác sỹ
   * @param {Object} dateRange - {tuNgay: Date, denNgay: Date}
   * @returns {Object} - Thống kê bác sỹ
   */
  static getThongKeLoiTheoBacSy(listHoSo, bacSyId, dateRange = null) {
    const hoSoBacSy = this._locHoSoTheoBacSy(listHoSo, bacSyId, dateRange);
    
    return {
      bacSy: bacSyId,
      tongHoSo: hoSoBacSy.length,
      tongHoSoLoi: hoSoBacSy.filter(hs => this._coLoi(hs)).length,
      tyLeLoi: this._tinhTyLe(
        hoSoBacSy.filter(hs => this._coLoi(hs)).length,
        hoSoBacSy.length
      ),
      tongLoi: this._tongLoi(hoSoBacSy),
      loiTheoLoai: this._groupLoiTheoLoai(hoSoBacSy),
      diem: this._tinhDiemChatLuong(hoSoBacSy), // 0-100, 100 = không lỗi
      doKhoLoi: this._tinhDoKhoLoi(hoSoBacSy), // CRITICAL, HIGH, MEDIUM, LOW
      loiGanDay: this._getLoiGanDay(hoSoBacSy, 10), // 10 lỗi gần đây nhất
    };
  }

  /**
   * 3. CHI PHÍ BỊ ẢNH HƯỞNG TỪ LỖI
   * 
   * @param {Array} listHoSo - Danh sách hồ sơ
   * @param {String} filterBy - 'KHOA' | 'BACSY' | 'LOILOI' | 'ALL'
   * @param {String} filterValue - Giá trị filter (khoa, bacsy id, loại lỗi)
   * @param {Object} dateRange - {tuNgay: Date, denNgay: Date}
   * @returns {Object} - Chi phí ảnh hưởng
   */
  static getChiPhiBiAnhHuong(listHoSo, filterBy = 'ALL', filterValue = null, dateRange = null) {
    const hoSoLoc = this._locHoSoTheoFilter(listHoSo, filterBy, filterValue, dateRange);
    
    // Tính chi phí từ each lỗi
    const chiPhiDetail = [];
    hoSoLoc.forEach(hoSo => {
      if (hoSo.giam_dinh_5_tang?.ket_qua_giam_dinh) {
        hoSo.giam_dinh_5_tang.ket_qua_giam_dinh.forEach(loi => {
          const chiPhi = this._tinhChiPhiLoi(loi, hoSo);
          if (chiPhi > 0) {
            chiPhiDetail.push({
              maLk: hoSo.ma_lk,
              maBn: hoSo.ma_bn,
              loiType: loi.type,
              tenLoi: loi.message,
              bacSy: hoSo.xml1?.MA_BS_KHAM || 'N/A',
              khoa: hoSo.xml1?.MA_KHOA || 'N/A',
              chiPhi: chiPhi,
              loaiChiPhi: this._getLoaiChiPhi(loi),
              ngayKham: hoSo.xml1?.NGAY_VAO || null,
            });
          }
        });
      }
    });

    // Tổng hợp
    const tongChiPhi = chiPhiDetail.reduce((sum, item) => sum + item.chiPhi, 0);
    const chiPhiTheoLoai = this._groupChiPhiTheoLoai(chiPhiDetail);
    const topHoSoMatTien = chiPhiDetail
      .sort((a, b) => b.chiPhi - a.chiPhi)
      .slice(0, 10);

    return {
      tongChiPhi: tongChiPhi,
      soHoSoAnhHuong: new Set(chiPhiDetail.map(x => x.maLk)).size,
      chiPhiTrungBinhTheoHoSo: tongChiPhi / new Set(chiPhiDetail.map(x => x.maLk)).size || 0,
      chiPhiTheoDichVu: chiPhiTheoLoai,
      topHoSoMatTien: topHoSoMatTien,
      percentChiPhiVsMucHoTro: this._tinhPercentChiPhi(tongChiPhi),
    };
  }

  /**
   * 4. BÁO CÁO TUÂN THỤ QUY TẮC
   * 
   * @param {Array} listHoSo - Danh sách hồ sơ
   * @param {String} quyTacId - Mã quy tắc
   * @param {Object} dateRange - {tuNgay: Date, denNgay: Date}
   * @returns {Object} - Thống kê tuân thủ
   */
  static getThongKeTuanThuQuyTac(listHoSo, quyTacId = null, dateRange = null) {
    const hoSoLoc = dateRange ? this._locHoSoTheoNgay(listHoSo, dateRange) : listHoSo;

    const danhSachQuyTac = [
      'QT_TUYEN_CHUYEN_MON',
      'QT_HOP_DONG',
      'QT_CONG_KHAM',
      'QT_CDHA',
      'QT_GUO_BENH',
      'QT_NHAN_SU',
      'QT_PHTHUOC',
      'QT_THUOC',
      'QT_MAU',
      'QT_HANH_CHINH',
      'QT_CAU_TRUC_DATA',
    ];

    const quyTacToCheck = quyTacId ? [quyTacId] : danhSachQuyTac;

    const thongKeQuyTac = quyTacToCheck.map(qt => {
      const hoSoTuanThu = hoSoLoc.filter(hs => !this._viPhamQuyTac(hs, qt));
      return {
        quyTacId: qt,
        tenQuyTac: this._getTenQuyTac(qt),
        tongHoSoKiemTra: hoSoLoc.length,
        tongHoSoTuanThu: hoSoTuanThu.length,
        tyLeTuanThu: this._tinhTyLe(hoSoTuanThu.length, hoSoLoc.length),
        soHoSoViPham: hoSoLoc.length - hoSoTuanThu.length,
      };
    });

    return {
      tongQuyTac: quyTacToCheck.length,
      tyLeTuanThuTrungBinh: this._tinhTyLeTrungBinh(thongKeQuyTac.map(x => x.tyLeTuanThu)),
      chiTiet: thongKeQuyTac,
      quyTacDangCo: thongKeQuyTac.filter(x => x.soHoSoViPham > 0),
    };
  }

  /**
   * 5. XU HƯỚNG LỖI THEO THỜI GIAN
   * 
   * @param {Array} listHoSo - Danh sách hồ sơ
   * @param {String} khoa - Tùy chọn lọc theo khoa
   * @param {Number} soThang - Số tháng lấy dữ liệu (VD: 3 = 3 tháng gần đây)
   * @returns {Object} - Xu hướng
   */
  static getXuHuongLoiTheoThang(listHoSo, khoa = null, soThang = 3) {
    const hoSoLoc = khoa ? this._locHoSoTheoKhoa(listHoSo, khoa) : listHoSo;
    
    const thangData = [];
    for (let i = soThang - 1; i >= 0; i--) {
      const date = new Date();
      date.setMonth(date.getMonth() - i);
      const thang = date.getMonth() + 1;
      const nam = date.getFullYear();
      
      const hoSoThang = hoSoLoc.filter(hs => {
        const ngay = new Date(hs.xml1?.NGAY_VAO);
        return ngay.getMonth() + 1 === thang && ngay.getFullYear() === nam;
      });

      thangData.push({
        thang: `${thang}/${nam}`,
        tongHoSo: hoSoThang.length,
        tongLoi: this._tongLoi(hoSoThang),
        tyLeLoi: this._tinhTyLe(
          hoSoThang.filter(hs => this._coLoi(hs)).length,
          hoSoThang.length
        ),
        loiTrungBinh: this._tongLoi(hoSoThang) / hoSoThang.length || 0,
      });
    }

    // Tính xu hướng (tăng/giảm)
    const trend = this._tinhTrendXuHuong(thangData);

    return {
      soThang: soThang,
      duLieuThang: thangData,
      xuHuong: trend, // 'TANG' | 'GIAM' | 'BANG'
      percentChange: this._tinhPercentChange(thangData[0], thangData[thangData.length - 1]),
    };
  }

  /**
   * 6. TOP LOẠI LỖI NHIỀU NHẤT
   * 
   * @param {Array} listHoSo - Danh sách hồ sơ
   * @param {Number} topN - Lấy top N (VD: 5)
   * @returns {Array} - Danh sách top lỗi
   */
  static getTopLoiNhieuNhat(listHoSo, topN = 10) {
    const allErrors = [];
    
    listHoSo.forEach(hoSo => {
      if (hoSo.giam_dinh_5_tang?.ket_qua_giam_dinh) {
        hoSo.giam_dinh_5_tang.ket_qua_giam_dinh.forEach(loi => {
          allErrors.push({
            tenLoi: loi.message,
            type: loi.type,
            level: loi.level, // CRITICAL, ERROR, WARNING
            mucDoNang: loi.severity || 'MEDIUM',
          });
        });
      }
    });

    // Group và count
    const grouped = {};
    allErrors.forEach(err => {
      const key = `${err.type}:${err.tenLoi}`;
      grouped[key] = (grouped[key] || 0) + 1;
    });

    // Sort và slice
    return Object.entries(grouped)
      .map(([key, count]) => {
        const [type, message] = key.split(':');
        return { type, message, lanGap: count };
      })
      .sort((a, b) => b.lanGap - a.lanGap)
      .slice(0, topN);
  }

  // ======================== HELPER FUNCTIONS ========================

  /**
   * Lọc hồ sơ theo khoa
   */
  static _locHoSoTheoKhoa(listHoSo, khoa, dateRange = null) {
    let result = listHoSo.filter(hs => hs.xml1?.MA_KHOA === khoa);
    if (dateRange) {
      result = this._locHoSoTheoNgay(result, dateRange);
    }
    return result;
  }

  /**
   * Lọc hồ sơ theo bác sỹ
   */
  static _locHoSoTheoBacSy(listHoSo, bacSyId, dateRange = null) {
    let result = listHoSo.filter(hs => hs.xml1?.MA_BS_KHAM === bacSyId);
    if (dateRange) {
      result = this._locHoSoTheoNgay(result, dateRange);
    }
    return result;
  }

  /**
   * Lọc hồ sơ theo ngày
   */
  static _locHoSoTheoNgay(listHoSo, dateRange) {
    return listHoSo.filter(hs => {
      const ngayKham = new Date(hs.xml1?.NGAY_VAO);
      return ngayKham >= dateRange.tuNgay && ngayKham <= dateRange.denNgay;
    });
  }

  /**
   * Lọc hồ sơ theo filter chung
   */
  static _locHoSoTheoFilter(listHoSo, filterBy, filterValue, dateRange) {
    let result = listHoSo;
    
    if (filterBy === 'KHOA') {
      result = this._locHoSoTheoKhoa(listHoSo, filterValue);
    } else if (filterBy === 'BACSY') {
      result = this._locHoSoTheoBacSy(listHoSo, filterValue);
    }
    
    if (dateRange) {
      result = this._locHoSoTheoNgay(result, dateRange);
    }
    
    return result;
  }

  /**
   * Kiểm tra hồ sơ có lỗi hay không
   */
  static _coLoi(hoSo) {
    return hoSo.giam_dinh_5_tang?.ket_qua_giam_dinh && 
           hoSo.giam_dinh_5_tang.ket_qua_giam_dinh.length > 0;
  }

  /**
   * Tính tổng số lỗi
   */
  static _tongLoi(listHoSo) {
    return listHoSo.reduce((sum, hs) => {
      const soLoi = hs.giam_dinh_5_tang?.ket_qua_giam_dinh?.length || 0;
      return sum + soLoi;
    }, 0);
  }

  /**
   * Tính tỷ lệ (%)
   */
  static _tinhTyLe(part, total) {
    if (total === 0) return 0;
    return Math.round((part / total) * 100);
  }

  /**
   * Tính tỷ lệ trung bình
   */
  static _tinhTyLeTrungBinh(rates) {
    if (rates.length === 0) return 0;
    return Math.round(rates.reduce((sum, r) => sum + r, 0) / rates.length);
  }

  /**
   * Group lỗi theo loại
   */
  static _groupLoiTheoLoai(listHoSo) {
    const grouped = {};
    
    listHoSo.forEach(hs => {
      hs.giam_dinh_5_tang?.ket_qua_giam_dinh?.forEach(loi => {
        const type = loi.type || 'UNKNOWN';
        grouped[type] = (grouped[type] || 0) + 1;
      });
    });

    return Object.entries(grouped).map(([type, count]) => ({
      type: this._getTenLoaiLoi(type),
      soLoi: count,
    }));
  }

  /**
   * Group lỗi theo quy tắc vi phạm
   */
  static _groupLoiTheoQuyTac(listHoSo) {
    const grouped = {};
    
    listHoSo.forEach(hs => {
      hs.giam_dinh_5_tang?.ket_qua_giam_dinh?.forEach(loi => {
        const quyTac = loi.rule_id || 'UNKNOWN';
        grouped[quyTac] = (grouped[quyTac] || 0) + 1;
      });
    });

    return Object.entries(grouped)
      .map(([qt, count]) => ({ quyTac: qt, soLoi: count }))
      .sort((a, b) => b.soLoi - a.soLoi);
  }

  /**
   * Get top bác sỹ có lỗi nhất
   */
  static _getTopBacSyLoi(listHoSo, topN) {
    const bacSyLoi = {};
    
    listHoSo.forEach(hs => {
      const bacSy = hs.xml1?.MA_BS_KHAM || 'UNKNOWN';
      const soLoi = hs.giam_dinh_5_tang?.ket_qua_giam_dinh?.length || 0;
      
      if (soLoi > 0) {
        bacSyLoi[bacSy] = (bacSyLoi[bacSy] || 0) + soLoi;
      }
    });

    return Object.entries(bacSyLoi)
      .map(([bacSy, soLoi]) => ({ bacSy, soLoi }))
      .sort((a, b) => b.soLoi - a.soLoi)
      .slice(0, topN);
  }

  /**
   * Tính chi phí theo khoa
   */
  static _tinhChiPhiTheoKhoa(listHoSo) {
    const tongChiPhi = {};
    
    listHoSo.forEach(hs => {
      const khoa = hs.xml1?.MA_KHOA || 'UNKNOWN';
      if (!tongChiPhi[khoa]) tongChiPhi[khoa] = 0;
      
      hs.giam_dinh_5_tang?.ket_qua_giam_dinh?.forEach(loi => {
        tongChiPhi[khoa] += this._tinhChiPhiLoi(loi, hs);
      });
    });

    return tongChiPhi;
  }

  /**
   * Tính chi phí 1 lỗi
   * (Có thể custom theo từng loại lỗi)
   */
  static _tinhChiPhiLoi(loi, hoSo) {
    // Lôgic cơ bản: lỗi càng nặng càng mất tiền nhiều
    const chiPhiBan = {
      'CRITICAL': 10000000,    // 10 triệu
      'ERROR': 5000000,         // 5 triệu
      'WARNING': 2000000,       // 2 triệu
      'INFO': 500000,           // 500 K
    };

    const level = loi.level || 'WARNING';
    return chiPhiBan[level] || 1000000;
  }

  /**
   * Get loại chi phí
   */
  static _getLoaiChiPhi(loi) {
    if (loi.type?.includes('TIEN_GIUONG')) return 'GIƯỜNG';
    if (loi.type?.includes('THUOC')) return 'THUỐC';
    if (loi.type?.includes('DVKT')) return 'DVKT';
    if (loi.type?.includes('VTYT')) return 'VẬT TƯ';
    return 'KHÁC';
  }

  /**
   * Group chi phí theo loại
   */
  static _groupChiPhiTheoLoai(chiPhiDetail) {
    const grouped = {};
    
    chiPhiDetail.forEach(item => {
      const loai = item.loaiChiPhi;
      grouped[loai] = (grouped[loai] || 0) + item.chiPhi;
    });

    return grouped;
  }

  /**
   * Tính % chi phí so với mục hỗ trợ
   */
  static _tinhPercentChiPhi(tongChiPhi) {
    const mucHoTro = 100000000; // 100 triệu (giả định)
    return Math.round((tongChiPhi / mucHoTro) * 100);
  }

  /**
   * Tính điểm chất lượng bác sỹ (0-100)
   */
  static _tinhDiemChatLuong(listHoSo) {
    if (listHoSo.length === 0) return 100;
    
    const tyLeLoi = this._tinhTyLe(
      listHoSo.filter(hs => this._coLoi(hs)).length,
      listHoSo.length
    );
    
    return 100 - tyLeLoi;
  }

  /**
   * Tính độ khó của lỗi
   */
  static _tinhDoKhoLoi(listHoSo) {
    const levels = listHoSo
      .flatMap(hs => hs.giam_dinh_5_tang?.ket_qua_giam_dinh || [])
      .map(loi => loi.level || 'WARNING');

    if (levels.includes('CRITICAL')) return 'CRITICAL';
    if (levels.includes('ERROR')) return 'HIGH';
    if (levels.includes('WARNING')) return 'MEDIUM';
    return 'LOW';
  }

  /**
   * Get lỗi gần đây nhất
   */
  static _getLoiGanDay(listHoSo, topN) {
    const allLoi = listHoSo
      .flatMap(hs => 
        (hs.giam_dinh_5_tang?.ket_qua_giam_dinh || []).map(loi => ({
          ...loi,
          ngayKham: hs.xml1?.NGAY_VAO,
        }))
      )
      .sort((a, b) => new Date(b.ngayKham) - new Date(a.ngayKham))
      .slice(0, topN);

    return allLoi;
  }

  /**
   * Get xu hướng theo tháng
   */
  static _getXuHuongTheoThang(listHoSo) {
    // Tương tự getXuHuongLoiTheoThang nhưng dùng trong context khác
    return this.getXuHuongLoiTheoThang(listHoSo, null, 3);
  }

  /**
   * Check hồ sơ có vi phạm quy tắc không
   */
  static _viPhamQuyTac(hoSo, quyTacId) {
    return hoSo.giam_dinh_5_tang?.ket_qua_giam_dinh?.some(
      loi => loi.rule_id === quyTacId
    );
  }

  /**
   * Get tên quy tắc
   */
  static _getTenQuyTac(quyTacId) {
    const tenMap = {
      'QT_TUYEN_CHUYEN_MON': 'Quy tắc tuyến chuyên môn',
      'QT_HOP_DONG': 'Quy tắc hợp đồng',
      'QT_CONG_KHAM': 'Quy tắc công khám',
      'QT_CDHA': 'Quy tắc CĐHA',
      'QT_GIUONG_BENH': 'Quy tắc giường bệnh',
      'QT_NHAN_SU': 'Quy tắc nhân sự',
      'QT_PTHUOC': 'Quy tắc phẫu/thủ thuật',
      'QT_THUOC': 'Quy tắc thuốc',
      'QT_MAU': 'Quy tắc máu',
      'QT_HANH_CHINH': 'Quy tắc hành chính',
      'QT_CAU_TRUC_DATA': 'Quy tắc cấu trúc dữ liệu',
    };
    return tenMap[quyTacId] || quyTacId;
  }

  /**
   * Get tên loại lỗi
   */
  static _getTenLoaiLoi(type) {
    const tenMap = {
      'ADMIN': 'Hành chính',
      'FINANCIAL': 'Tài chính',
      'MEDICAL': 'Y tế',
      'RULE': 'Quy tắc',
      'DATA': 'Dữ liệu',
    };
    return tenMap[type] || type;
  }

  /**
   * Tính xu hướng (TANG/GIAM/BANG)
   */
  static _tinhTrendXuHuong(thangData) {
    if (thangData.length < 2) return 'BANG';
    
    const first = thangData[0].tyLeLoi;
    const last = thangData[thangData.length - 1].tyLeLoi;
    
    if (last > first + 5) return 'TANG';
    if (last < first - 5) return 'GIAM';
    return 'BANG';
  }

  /**
   * Tính % thay đổi
   */
  static _tinhPercentChange(thungDau, thungCuoi) {
    if (!thungDau || !thungCuoi || thungDau.soLoi === 0) return 0;
    return Math.round(((thungCuoi.soLoi - thungDau.soLoi) / thungDau.soLoi) * 100);
  }
}

// Export default
export default ApiThongKeLoi;
