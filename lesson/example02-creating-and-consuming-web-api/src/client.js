import { get } from 'node:http';
import { Transform, Writable } from 'node:stream';
import { createWriteStream } from 'node:fs';

const url = "http://localhost:3000";

const getHttpStream = () => new Promise(resolve => get(url, response => resolve(response)));

const stream = await getHttpStream();;

function isNameNumberEven(item) {
  const myNumber = /\d+/.exec(item.name)[0];
  return myNumber % 2 === 0;
}

stream
  .pipe(
    Transform({
      objectMode: true,
      transform(chunk, enc, cb) {
        const item = JSON.parse(chunk);

        const isEven = isNameNumberEven(item);

        item.name = item.name.concat(isEven ? ' is even' : ' is odd')

        cb(null, JSON.stringify(item))
      }
    })
  )
  .filter(chunk => chunk.includes('even'))
  .map(chunk => chunk.toUpperCase() + "\n")
  .pipe(
    //flag a => append data if existent
    createWriteStream('response.log', { flags: 'a'})
  )
  // .pipe(
  //   Writable({
  //     objectMode: true,
  //     write(chunk, enc, cb) {
  //       console.log('chunk', chunk)
  //         return cb()
  //       }
  //     })
  //   )