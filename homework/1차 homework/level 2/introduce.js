const introduceTeam = (team) => {
    console.log("저희 팀 소개를 시작합니다!");
    for(let member of team) {
        console.log("안녕하세요!");
        console.log(`제 이름은 ${member.name}입니다.`);
        console.log(`제가 사는 곳은 ${member.home}입니다.`);
        console.log(`제 나이는 ${member.age}살 입니다.`);
        console.log('저의 취미는');
        for(let hobby of member.hobby) {
            console.log(hobby);
        }
        console.log("입니다.")
        console.log("=================================");
    }
}

const myTeam = [
    {
        name: '오승재',
        home: '서울특별시 중랑구',
        age: 23,
        hobby: ['게임하기', '맛있는 것 먹기', '돌아다니기']
    }, {
        name: '김기문',
        home: '서울 동작구 상도동',
        age: 26,
        hobby: ['우리집 고양이랑 뒹굴거리기', '기타치기']
    }, {
        name: '이주은',
        home: '경기도 군포시',
        age: 24,
        hobby: ['우리집 강아지랑 뒹굴거리기', '요리하기']
    }, {
        name: '김채원',
        home: '서울시 양천구',
        age: 22,
        hobby: ['자전거타기', '강아지 영상보기', '염색하기']
    }
];

introduceTeam(myTeam);