export function convertPhoneNumberTo0(phoneNumber: string): string {
  // Xóa ký tự "+" và khoảng trắng (nếu có)

  const cleanedNumber = phoneNumber.replace(/[+\s]/g, "");

  // Kiểm tra xem số điện thoại có đúng định dạng không
  const regex = /^84\d{9}$/;
  if (!regex.test(cleanedNumber)) {
    throw new Error("Số điện thoại không hợp lệ.");
  }

  // Thay thế tiền tố "84" bằng "0"
  const convertedNumber = cleanedNumber.replace(/^84/, "0");

  return convertedNumber;
}
export function convertPhoneNumberTo84(phoneNumber: string): string {
  // Xóa khoảng trắng (nếu có)
  const cleanedNumber = phoneNumber.replace(/\s/g, "");

  // Kiểm tra xem số điện thoại có đúng định dạng không
  const regex = /^0\d{9}$/;
  if (!regex.test(cleanedNumber)) {
    throw new Error("Số điện thoại không hợp lệ.");
  }

  // Thêm tiền tố "+84" vào số điện thoại
  const convertedNumber = "+84" + cleanedNumber.substring(1);

  return convertedNumber;
}
