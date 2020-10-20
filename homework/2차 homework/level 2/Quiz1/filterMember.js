const members = require('./member');

function getFemale(members) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      const newMembers = members.filter(member => member.gender == "여");
      resolve(newMembers);
    }, 1000);
  });
}

function getYB(members) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      const newMembers = members.filter(member => member.status == "YB");
      resolve(newMembers);
    }, 1000);
  });
}

function getIOS(members) {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      const newMembers = members.filter(member => member.part == "iOS");
      resolve(newMembers);
    }, 1000);
  });
}

getFemale(members)
  .then( members => {
    console.log("Filter Female");
    console.log(members);
    return getYB(members);
  })
  .then( members => {
    console.log("And Filter YB");
    console.log(members);
    return getIOS(members);
  })
  .then( members => {
    console.log("And Filter IOS");
    console.log(members);
  });