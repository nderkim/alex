export default (
  fromReadableSource: NodeJS.ReadableStream,
  toWriteableDestination: NodeJS.WritableStream,
  opts?: {
    end?: boolean;
  }
): Promise<void> =>
  new Promise((resolve, reject) => {
    fromReadableSource.once("end", resolve);
    fromReadableSource.once("error", reject);
    fromReadableSource.pipe(toWriteableDestination, opts); // By default, stream.end() is called on the destination Writable stream when the source Readable stream emits 'end'.
  });
