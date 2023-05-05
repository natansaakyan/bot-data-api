export async function serialPromise<R, T = unknown>(
  data: T[],
  fn: (element: T) => Promise<R>,
): Promise<R[]> {
  const results = [];

  await data.reduce((p, element) => {
    return p.then(async () => {
      results.push(await fn(element));
    });
  }, Promise.resolve());

  return results;
}
