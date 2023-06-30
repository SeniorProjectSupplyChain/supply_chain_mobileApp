export function parseUrl(
  url: string
): { domain: string; path: string; id: string } | null {
  const urlRegex = /^https?:\/\/[^\s/$.?#].[^\s]*$/;

  if (!urlRegex.test(url)) {
    // Nếu chuỗi không đúng định dạng URL, trả về null hoặc giá trị khác để biểu thị lỗi
    return null;
  }

  const domain = url.split("/").slice(0, 3).join("/") + "/";
  const path = url.split("/").slice(-2)[0];
  const id = url.split("/").slice(-1)[0];

  return {
    domain: domain,
    path: path,
    id: id,
  };
}
