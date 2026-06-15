// @ts-check
import { IHisService, HisAuthOptions, Patient } from './IHisService';
import { HisAPI } from '../his_api.jsx';

/**
 * @class LegacyHisApiAdapter
 * @implements IHisService
 * @description
 * Đây là một Adapter đặc biệt, hoạt động như một "lớp bọc" (wrapper) cho file `his_api.jsx` cũ.
 * Mục đích của nó là làm cho logic cũ tương thích với kiến trúc mới dựa trên `IHisService`
 * mà không cần phải viết lại toàn bộ logic đó ngay lập tức.
 * 
 * Nó nhận các yêu cầu từ Factory và "dịch" chúng thành các lệnh gọi đến `HisAPI` singleton.
 */
export class LegacyHisApiAdapter implements IHisService {
  authOptions: HisAuthOptions;

  /**
   * @param {HisAuthOptions} authOptions
   */
  constructor(authOptions: HisAuthOptions) {
    this.authOptions = authOptions;
    console.log("Khởi tạo LegacyHisApiAdapter. Adapter này sẽ sử dụng logic từ 'his_api.jsx'.");
    // Với adapter này, chúng ta không cần authOptions vì `his_api.jsx` có cơ chế cấu hình riêng.
  }

  /**
   * Kiểm tra kết nối bằng cách gọi một hàm REST đơn giản từ API cũ.
   * @returns {Promise<boolean>}
   */
  async checkConnection(): Promise<boolean> {
    try {
      // Chúng ta có thể giả định rằng nếu gọi một endpoint cơ bản (ví dụ: /health)
      // mà không có lỗi, thì kết nối được coi là thành công.
      await HisAPI.fetchREST('/health', 'GET');
      console.log("LegacyHisApiAdapter: checkConnection thành công.");
      return true;
    } catch (error) {
      console.error("LegacyHisApiAdapter: checkConnection thất bại.", error);
      return false;
    }
  }

  /**
   * Ánh xạ hàm getPatientById tới hàm getAndParseXML130FromHIS của API cũ.
   * @param {string} maLuotKham - Đây là Mã Lượt Khám, không phải ID bệnh nhân.
   * @returns {Promise<Patient | null>}
   */
  async getPatientById(maLuotKham: string): Promise<Patient | null> {
    console.log(`LegacyHisApiAdapter: Đang lấy hồ sơ XML 130 cho mã lượt khám: ${maLuotKham}`);
    const result = await HisAPI.getAndParseXML130FromHIS(maLuotKham);

    if (!result?.success || !result?.data?.xml1) {
      return null;
    }

    const xml1 = result.data.xml1 as Record<string, unknown>;
    const ngaySinhRaw = String(xml1.NGAY_SINH || "").trim();
    const dob = this.parseNgaySinh(ngaySinhRaw);

    return {
      id: String(xml1.MA_BN || xml1.MA_LK || maLuotKham),
      name: String(xml1.HO_TEN || "").trim(),
      dob,
      gender: String(xml1.GIOI_TINH || "").trim(),
      insuranceCardNumber: String(xml1.MA_THE_BHYT || xml1.MA_THE || "").trim(),
    };
  }

  private parseNgaySinh(ngaySinh: string): Date {
    if (!ngaySinh) {
      return new Date(0);
    }

    const compactValue = ngaySinh.replace(/[^0-9]/g, "");
    if (compactValue.length === 8) {
      const day = Number(compactValue.slice(0, 2));
      const month = Number(compactValue.slice(2, 4)) - 1;
      const year = Number(compactValue.slice(4, 8));
      const parsedDate = new Date(year, month, day);

      if (!Number.isNaN(parsedDate.getTime())) {
        return parsedDate;
      }
    }

    if (compactValue.length === 4) {
      const year = Number(compactValue);
      const parsedDate = new Date(year, 0, 1);

      if (!Number.isNaN(parsedDate.getTime())) {
        return parsedDate;
      }
    }

    const fallbackDate = new Date(ngaySinh);
    return Number.isNaN(fallbackDate.getTime()) ? new Date(0) : fallbackDate;
  }

  /**
   * Gửi hồ sơ kiểm tra BHYT.
   * @param {string} xmlData - Dữ liệu XML để gửi đi.
   * @returns {Promise<{success: boolean; message: string; transactionId?: string}>}
   */
  async submitClaim(xmlData: string): Promise<{success: boolean; message: string; transactionId?: string}> {
    try {
      // his_api.jsx sử dụng phương thức SOAP. Chúng ta cần một `actionName`.
      // Giả sử action mặc định là "NhanHoSoKhamChuaBenh".
      const actionName = 'NhanHoSoKhamChuaBenh';
      const responseXml = await HisAPI.fetchSOAP(actionName, xmlData);

      // Cần phải phân tích `responseXml` để xem kết quả thành công hay thất bại.
      // Đây là một ví dụ giả định. Logic thực tế sẽ phụ thuộc vào định dạng trả về của HIS.
      if (responseXml.includes('<ErrorCode>0</ErrorCode>')) {
        // Giả sử tìm thấy một transactionId trong response
        const match = responseXml.match(/<TransactionID>(.*?)<\/TransactionID>/);
        const transactionId = match ? match[1] : `legacy_${Date.now()}`;
        return {
          success: true,
          message: "Gửi hồ sơ thành công (qua Legacy Adapter).",
          transactionId: transactionId,
        };
      } else {
        const match = responseXml.match(/<ErrorMessage>(.*?)<\/ErrorMessage>/);
        const message = match ? match[1] : "Lỗi không xác định từ HIS.";
        return { success: false, message };
      }
    } catch (error) {
      const err = error as Error;
      return { success: false, message: err.message };
    }
  }

  /**
   * @returns {Promise<any[]>}
   */
  async getServices(): Promise<any[]> {
    console.warn("LegacyHisApiAdapter: Phương thức 'getServices' chưa được triển khai trong 'his_api.jsx'.");
    // Trả về một mảng rỗng hoặc ném lỗi tùy theo yêu cầu của ứng dụng
    return Promise.resolve([]);
  }

  /**
   * @returns {Promise<any[]>}
   */
  async getDrugs(): Promise<any[]> {
    console.warn("LegacyHisApiAdapter: Phương thức 'getDrugs' chưa được triển khai trong 'his_api.jsx'.");
    return Promise.resolve([]);
  }
}
