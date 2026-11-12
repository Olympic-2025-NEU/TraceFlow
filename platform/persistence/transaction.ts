/** Một ca sử dụng ghi aggregate, lịch sử và outbox trong cùng callback này. */
export type Transaction = {
  run<T>(work: () => Promise<T>): Promise<T>;
};
