import Big from "big.js";

export function formatCurrency(value: number): string {
  const suffixes = ["", "K", "M", "B", "T", "Q"];

  const suffixIndex = Math.floor(String(value).length / 3);

  if (suffixIndex <= 1) {
    return String(value);
  }

  const formattedValue = (value / Math.pow(10, suffixIndex * 3)).toFixed(2);
  return `${formattedValue}${suffixes[suffixIndex]}`;
}
export function formatNumberWithCommas(numberString?: string): string {
  const number = Number(numberString?.replace(/[^0-9.-]+/g, "")); // Chuyển đổi chuỗi thành số
  if (isNaN(number)) {
    return "";
  }
  return number.toLocaleString();
}
// export function formatCurrency(value: string): string {
//   const suffixes = ["", "K", "M", "B", "T", "Q"];
//   const suffixIndex = Math.floor(value.length / 3);

//   if (suffixIndex <= 1) {
//     return value;
//   }

//   const formattedValue = new Big(value)
//     .div(new Big(10).pow(suffixIndex * 3))
//     .toFixed(2);
//   return `${formattedValue} ${suffixes[suffixIndex]}`;
// }
