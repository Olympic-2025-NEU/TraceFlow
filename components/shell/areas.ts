/** Khung Tầng ứng dụng. Trang thêm khi có ca sử dụng tương ứng. */
export const shellAreas = [
  { href: "/inbox", label: "Hộp việc", audience: "operator" },
  { href: "/console", label: "Bảng điều khiển", audience: "admin" },
] as const;
