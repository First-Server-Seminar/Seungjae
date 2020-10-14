const members = require("./member");
const group = [];
const groupSize = 6;

// 그룹 생성
for(let i = 0; i < groupSize; i++) {
  group.push({
    "teamName": `${i + 1}조`,
    "teamMembers": []
  });
}

// 모든 멤버들 Mix
members.sort(() => (0.5-Math.random()));

// 믹스된 그룹에서 OB만 추출
const OBMembers = members.filter( (member) => member.status === "OB");

// 믹스된 그룹에서 YB만 추출
const YBMembers = members.filter( (member) => member.status === "YB");

let index = 0;

// OB를 그룹에 넣기
for(let member of OBMembers) {
  group[index++].teamMembers.push(member);
  if(index === 6) {
    index = 0;
  }
}

// 인원수 분배보다는 OB, YB 비율에 초점!
index = 0;

// YB를 그룹에 넣기
for(let member of YBMembers) {
  group[index++].teamMembers.push(member);
  if(index === 6) {
    index = 0;
  }
}

// 랜덤으로 짠 그룹 출력!
for(let team of group) {
  console.log(`저희는 ${team.teamName}입니다!`);
  console.log("저희 팀원들을 소개합니다!");
  console.log(team.teamMembers);
}