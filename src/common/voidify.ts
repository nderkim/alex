// void async function (fire and forget)
export default <Args extends unknown[], Result>(
  fn: (...args: Args) => Promise<Result>,
  cb?: (err: Error | null, res?: Result) => void
) => (...args: Args): void =>
  void fn(...args).then(
    (res) => cb?.(null, res),
    (err) => cb?.(err)
  );
