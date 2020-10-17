// 중학교 -> 고등학교 -> 대학교

const isStudent = false;

const middleSchool = () => new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('중학교');
  }, 1000);
});

const highSchool = school => new Promise((resolve, reject) => {
  if (isStudent) {
    setTimeout(() => {
      resolve(`${school} => 고등학교`);
    }, 1000);
  } else {
    setTimeout(() => {
      reject(new Error('Error!'));
    }, 1000);
  }
});

const univ = school => new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(`${school} => 대학교`);
  }, 1000);
});

middleSchool()
  .then(school => highSchool(school))
  .catch(error => {
    return `검정고시`;
  }) // 이런 식으로 에러를 내는 것이 아니라 에러에 대한 값을 주고 이어나갈 수도 있다!
  .then(school => univ(school))
  .then(result => console.log(result))
  .catch(error => console.error(error)); // 이렇게 그냥 에러를 낼 수도 있고!