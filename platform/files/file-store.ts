import type { TenantId } from "../kernel/id";

/** Byte nằm ở object storage. Bảng platform.attachment chỉ giữ siêu dữ liệu. */
export type StoredFile = {
  id: string;
  tenantId: TenantId;
  fileName: string;
  mediaType: string;
  byteSize: number;
};

export type FileStore = {
  put(input: {
    tenantId: TenantId;
    fileName: string;
    mediaType: string;
    body: Uint8Array;
  }): Promise<StoredFile>;
};
