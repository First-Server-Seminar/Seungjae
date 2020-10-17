// 파일 생성 (동기적)
// const fs = require('fs');
// const numArr = [1, 2, 3, 4, 5];
// const fileCommonName = 'syncText';
// numArr.forEach((num) => {
//  const fileName = fileCommonName + num;
//  const data = `reserved message for the '${fileName}'`;
//  fs.writeFileSync(`${fileName}.txt`, data);
//  console.log(`file[${fileName}] write complete`);
// });

// 파일 생성 (비동기적)
// const fs = require('fs');
// const numArr = [1, 2, 3, 4, 5];
// const fileCommonName = 'asyncText';
// numArr.forEach((num) => {
//  const fileName = fileCommonName + num;
//  const data = `reserved message for the '${fileName}'`;
//  fs.writeFileSync(`${fileName}.txt`, data);
//  console.log(`file[${fileName}] write complete`);
// })

// 파일 읽기 (동기적)
// const fs = require('fs');
// const numArr = [1, 2, 3, 4, 5];
// const fileCommonName = 'syncText';
// numArr.forEach((num) => {
//  const fileName = fileCommonName + num;
//  const data = fs.readFileSync(`${fileName}.txt`);
//  console.log(`file[${fileName}] with ${data}`);
// })

// 파일 읽기 (비동기적)
const fs = require('fs');
const numArr = [1, 2, 3, 4, 5];
const fileCommonName = 'asyncText';
numArr.forEach((num) => {
 const fileName = fileCommonName + num;
 fs.readFile(`${fileName}.txt`, (err, data) => {
 console.log(`file[${fileName}] with ${data}`);
 });
});