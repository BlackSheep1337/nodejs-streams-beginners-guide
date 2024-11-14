// 1 - terminal inputs

// const stdin = process.stdin
//   .on('data', msg => console.log('entrada terminal', msg.toString()))

// const stdout = process.stdout
//   .on('data', msg => console.log('saida terminal', msg.toString()))

// stdin.pipe(stdout)

// process.stdout.write(crypto.randomBytes(1e9))

import http from 'http';
import { readFileSync, createReadStream } from 'fs';

http.createServer((req, res) => {
  // const file = readFileSync('big.file') //.toString();
  // res.write(file);
  // res.end();
  createReadStream('big.file')
    .pipe(res)
})
  .listen(3000)
  .on('listening', () => console.log('server is listening at 3000'));
