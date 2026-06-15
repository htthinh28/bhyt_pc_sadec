import { IHisService, HisAuthOptions } from './IHisService';
import { LegacyHisApiAdapter } from './LegacyHisApiAdapter';

// TODO: Import các adapter thật khi chúng được tạo
// import { ViettelHisAdapter } from './ViettelHisAdapter';
// import { VnptHisAdapter } from './VnptHisAdapter';

/**
 * 'legacy': Sử dụng logic từ his_api.jsx cũ, được bọc trong một Adapter. Đây là tùy chọn mặc định và an toàn nhất.
 * 'viettel', 'vnpt', ...: Các adapter cho những HIS cụ thể sẽ được thêm trong tương lai.
 */
export type HisProvider = 'legacy' | 'viettel' | 'vnpt';


/**
 * @class HisServiceFactory
 * @description
 * Nhà máy (Factory) chịu trách nhiệm khởi tạo và cung cấp một instance của IHisService.
 * Dựa vào cấu hình, nó sẽ quyết định sử dụng Adapter nào.
 */
class HisServiceFactory {
  /**
   * @private
   * @type {IHisService | null}
   */
  private _instance: IHisService | null = null;

  /**
   * Lấy về một instance duy nhất (Singleton) của service.
   * @param {HisProvider} provider - Tên của nhà cung cấp HIS. Mặc định là 'legacy' để đảm bảo tương thích ngược.
   * @param {HisAuthOptions} authOptions - Cấu hình để xác thực.
   * @returns {IHisService}
   */
  getInstance(provider: HisProvider = 'legacy', authOptions: HisAuthOptions): IHisService {
    if (this._instance) {
      return this._instance;
    }

    console.log(`Đang khởi tạo HIS Service Provider: ${provider}`);

    switch (provider) {
      case 'legacy':
        this._instance = new LegacyHisApiAdapter(authOptions);
        break;
      // case 'viettel':
      //   this._instance = new ViettelHisAdapter(authOptions);
      //   break;
      // case 'vnpt':
      //   this._instance = new VnptHisAdapter(authOptions);
      //   break;
      default:
        throw new Error(`Nhà cung cấp HIS '${provider}' không được hỗ trợ.`);
    }

    return this._instance;
  }
}

// Xuất ra một instance duy nhất của Factory để toàn bộ ứng dụng sử dụng
export const hisServiceFactory = new HisServiceFactory();
