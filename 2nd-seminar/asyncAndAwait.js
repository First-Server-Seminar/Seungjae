// 중학교 -> 고등학교 -> 대학교

const isStudent = true;

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

async function func1() {
  //async, await사용시 try-catch문을 사용해서 에러 핸들링
  try { 
    const middle = await middleSchool();
    const high = await highSchool(middle);
    // const high = await highSchool(middle).catch(e => '검정고시');
    // 이런식으로 에러에 대한 값을 주고 이어나갈 수도!
    const university = await univ(high);
  
    console.log(university);
  } catch(error) {
    console.error(error);
  } finally {
    console.log('무조건 실행'); 
    // 에러가 나든 중간에 에러를 핸들링해서 에러에 대한 값을 주던 제대로 되든 무조건 실행!
  }
  
}

func1();

// 1. await은 async함수 안에서만 쓸 수 있다.
// 2. await은 promise를 반환하는 객체에 대해서만 쓸 수 있다.