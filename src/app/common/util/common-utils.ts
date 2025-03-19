import { ConvertUtil } from "./convert.util";

export class CommonUtils {

  static generateRandomString(length: number): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  static toSlug(str: string): string {
    if (!str) return '';

    // Bảng ký tự tiếng Việt cần loại bỏ dấu
    const accentsMap: { [key: string]: string } = {
      á: 'a', à: 'a', ả: 'a', ã: 'a', ạ: 'a',
      ă: 'a', ắ: 'a', ằ: 'a', ẳ: 'a', ẵ: 'a', ặ: 'a',
      â: 'a', ấ: 'a', ầ: 'a', ẩ: 'a', ẫ: 'a', ậ: 'a',
      é: 'e', è: 'e', ẻ: 'e', ẽ: 'e', ẹ: 'e',
      ê: 'e', ế: 'e', ề: 'e', ể: 'e', ễ: 'e', ệ: 'e',
      í: 'i', ì: 'i', ỉ: 'i', ĩ: 'i', ị: 'i',
      ó: 'o', ò: 'o', ỏ: 'o', õ: 'o', ọ: 'o',
      ô: 'o', ố: 'o', ồ: 'o', ổ: 'o', ỗ: 'o', ộ: 'o',
      ơ: 'o', ớ: 'o', ờ: 'o', ở: 'o', ỡ: 'o', ợ: 'o',
      ú: 'u', ù: 'u', ủ: 'u', ũ: 'u', ụ: 'u',
      ư: 'u', ứ: 'u', ừ: 'u', ử: 'u', ữ: 'u', ự: 'u',
      ý: 'y', ỳ: 'y', ỷ: 'y', ỹ: 'y', ỵ: 'y',
      đ: 'd',
      Á: 'A', À: 'A', Ả: 'A', Ã: 'A', Ạ: 'A',
      Ă: 'A', Ắ: 'A', Ằ: 'A', Ẳ: 'A', Ẵ: 'A', Ặ: 'A',
      Â: 'A', Ấ: 'A', Ầ: 'A', Ẩ: 'A', Ẫ: 'A', Ậ: 'A',
      É: 'E', È: 'E', Ẻ: 'E', Ẽ: 'E', Ẹ: 'E',
      Ê: 'E', Ế: 'E', Ề: 'E', Ể: 'E', Ễ: 'E', Ệ: 'E',
      Í: 'I', Ì: 'I', Ỉ: 'I', Ĩ: 'I', Ị: 'I',
      Ó: 'O', Ò: 'O', Ỏ: 'O', Õ: 'O', Ọ: 'O',
      Ô: 'O', Ố: 'O', Ồ: 'O', Ổ: 'O', Ỗ: 'O', Ộ: 'O',
      Ơ: 'O', Ớ: 'O', Ờ: 'O', Ở: 'O', Ỡ: 'O', Ợ: 'O',
      Ú: 'U', Ù: 'U', Ủ: 'U', Ũ: 'U', Ụ: 'U',
      Ư: 'U', Ứ: 'U', Ừ: 'U', Ử: 'U', Ữ: 'U', Ự: 'U',
      Ý: 'Y', Ỳ: 'Y', Ỷ: 'Y', Ỹ: 'Y', Ỵ: 'Y',
      Đ: 'D'
    };

    // Loại bỏ dấu tiếng Việt
    let slug = str.replace(/[^A-Za-z0-9\s]/g, char => accentsMap[char] || char);

    // Chuyển thành chữ thường, thay khoảng trắng bằng dấu "_"
    slug = slug.toLowerCase().trim().replace(/\s+/g, '_');

    return slug;
  }

}
