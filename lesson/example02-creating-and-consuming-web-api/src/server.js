import http from 'node:http';
import { Readable } from 'node:stream';

import { randomUUID } from 'node:crypto';

function* run() {
  for (let index = 0; index <= 99; index++) {
    const data = {
      id: randomUUID(),
      name: `Alex-Andre-${index}`,
      at: Date.now(),
    }
    yield data;
  }
}

function handler(request, response) {
  // const readableStream = Readable({
  //   read() {
  //     this.push('Hello\n')
  //     this.push('World')
  //     this.push(null)
  //   }
  // });

    const readableStream = Readable({
      read() {
      for (const data of run()) {
        this.push(JSON.stringify(data).concat("\n"))
      }
        this.push(null)
      }
  });

  readableStream
    .pipe(response);
}

http.createServer(handler)
  .listen(3000)
  .on('listening', () => console.log('Server running on port 3000'));