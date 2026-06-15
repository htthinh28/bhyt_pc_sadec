
export interface Patient {
  id: string;          // Mã định danh duy nhất của bệnh nhân.
  name: string;        // Họ và tên bệnh nhân.
  dob: Date;           // Ngày sinh.
  gender: string;      // Giới tính.
  insuranceCardNumber: string; // Số thẻ BHYT.
}

export interface HisAuthOptions {
  apiUrl: string;      // Địa chỉ API của HIS.
  username: string;    // Tên đăng nhập.
  password: string;    // Mật khẩu.
  token?: string;      // Token xác thực (nếu có).
}

/**
 * @interface IHisService
 * @description
 * Định nghĩa cấu trúc chung cho một dịch vụ kết nối đến HIS (Health Information System).
 * Mỗi Adapter kết nối đến một HIS cụ thể (ví dụ: Viettel, VNPT, FPT...) phải triển khai (implement) đầy đủ các phương thức trong interface này.
 * Điều này đảm bảo tính nhất quán và khả năng thay thế, mở rộng trong tương lai.
 */
export interface IHisService {
  /**
   * Tùy chọn xác thực được sử dụng bởi dịch vụ.
   */
  authOptions: HisAuthOptions;

  /**
   * Kiểm tra kết nối và xác thực với hệ thống HIS.
   * @returns {Promise<boolean>} - Trả về true nếu kết nối và xác thực thành công.
   */
  checkConnection(): Promise<boolean>;

  /**
   * Lấy thông tin một bệnh nhân dựa trên ID.
   * @param {string} patientId - Mã bệnh nhân trong hệ thống HIS.
   * @returns {Promise<Patient | null>} - Trả về thông tin bệnh nhân hoặc null nếu không tìm thấy.
   */
  getPatientById(patientId: string): Promise<Patient | null>;

  /**
   * Gửi dữ liệu hồ sơ khám chữa bệnh (chuẩn XML của BHYT) lên HIS.
   * @param {string} xmlData - Dữ liệu XML dưới dạng chuỗi.
   * @returns {Promise<{success: boolean; message: string; transactionId?: string}>} - Trả về kết quả giao dịch.
   */
  submitClaim(xmlData: string): Promise<{success: boolean; message: string; transactionId?: string}>;

  /**
   * Lấy danh sách các dịch vụ kỹ thuật từ HIS.
   * @returns {Promise<any[]>}
   */
  getServices(): Promise<any[]>;

    /**
   * Lấy danh sách thuốc từ HIS.
   * @returns {Promise<any[]>}
   */
  getDrugs(): Promise<any[]>;
}
