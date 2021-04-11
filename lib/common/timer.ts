export const timeout = (ms?: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));

export async function* interval(ms?: number): AsyncIterable<void> {
  while (true) yield await timeout(ms);
}
