// A mock function to mimic making an async request for data
export function fetchCount(amount = 1) {
  return new Promise<{ data: number }>((resolve) =>
    // eslint-disable-next-line no-promise-executor-return
    setTimeout(() => resolve({ data: amount }), 500)
  );
}
