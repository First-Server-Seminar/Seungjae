function wakeUp() {
  wash();
}

function wash() {
  breakfast();
}

function breakfast() {
  throw new Error("콜스택 확인 테스트!");
}

wakeUp();

// 호출시 무조건 가장 먼저 쌓이는 anonymous!