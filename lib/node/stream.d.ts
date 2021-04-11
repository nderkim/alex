declare module "stream/promises" {
  export function pipeline(
    ...args: [
      AsyncIterable<string | Buffer>, // source
      ...(
        | ((
            source: AsyncIterable<string | Buffer>
          ) => AsyncIterable<string | Buffer>)
        | NodeJS.ReadWriteStream
      )[], // transforms
      NodeJS.WritableStream // destination
    ]
  ): Promise<void>;
}
