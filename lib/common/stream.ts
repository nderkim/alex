type Data = string | Buffer;
type Source = AsyncIterable<Data>;
type Transform = NodeJS.ReadWriteStream | ((source: Source) => Source);
type Destination = NodeJS.WritableStream;

export const pipe = async (
  source: Source,
  destination: Destination,
  opts?: {
    end?: boolean;
  }
): Promise<void> => {
  const { end = true } = opts || {};
  for await (const chunk of source) destination.write(chunk);
  end && destination.end(); // By default, stream.end() is called on the destination Writable stream when the source Readable stream emits 'end'.
};

export const pipeline = (
  ...args: [Source, ...Transform[], Destination]
): Promise<void> => {
  const [source, ...rest] = args;
  const transforms = rest.slice(1, -1) as Transform[];
  const destination = rest.slice(-1)[0] as Destination;
  const res = transforms.reduce((source, transform) => {
    if (typeof transform === "function") return transform(source);
    void pipe(source, transform);
    return transform;
  }, source);
  return pipe(res, destination);
};

export const concat = async (
  stream: AsyncIterable<Buffer>
): Promise<Buffer> => {
  const chunks = [];
  for await (const chunk of stream) chunks.push(chunk);
  return Buffer.concat(chunks);
};

// TODO
async function* debug(source: Source) {
  for await (const chunk of source) {
    await new Promise(setImmediate);
    console.log("chunk", chunk.length);
    yield chunk;
  }
}
