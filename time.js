const getTimer = (nums, timezone, minutes, stringrep) => {
  let timestring = "";
  if (nums > 59) {
    let remainder = nums % timezone;
    let actualtime = (nums - remainder) / timezone;
    let day = 86400;
    let week = 604800;
    let month = day * 31;
    let year = month * 12;
    let hours = 3600;
    let timezoneStringRep = actualtime > 1 ? stringrep + "s" : stringrep;
    let timeextra = "";
    let numtimeFormate = [];
    if (remainder) {
      let findRemainder = (remainder) => {
        let remaining;
        let calculateTime = (moment, str) => {
          remaining = remainder % moment;
          let actual = (remainder - remaining) / moment;
          numtimeFormate.push(actual + `${actual > 1 ? str + "s" : str}`);
          remainder += remaining;
        };
        if (remainder < 60) {
          if (remainder > 0) {
            numtimeFormate.push(remainder + `s`);
          }
          return;
        }
        if (remainder >= day && remainder < week) {
          calculateTime(day, "d");
        }
        if (remainder > week && remainder < month) {
          calculateTime(week, "w");
        }
        if (remainder > month && remainder < year) {
          calculateTime(month, "mnt");
        }
        if (remainder >= hours && remainder < day) {
          calculateTime(hours, "hr");
        }
        if (remainder >= minutes && remainder < hours) {
          calculateTime(minutes, "m");
        }
        findRemainder(remaining);
      };
      findRemainder(remainder);
      let timesequense = numtimeFormate.sort((a, b) => b - a);
      for (let i = 0; i < timesequense.length; i++) {
        if (timesequense[i] !== 0) timeextra += timesequense[i];
      }
    }
    timestring = `${actualtime}${timezoneStringRep}${timeextra}`;
  } else {
    timestring = `${nums}s`;
  }
  return timestring;
};
const calcTimer = (nums) => {
  let week = 604800;
  let day = 86400;
  let month = day * 31;
  let year = month * 12;
  let hour = 3600;
  let minutes = 60;
  let timer;
  if (nums >= hour && nums < day) {
    let time = getTimer(nums, hour, minutes, "hr");
    timer = time;
  }
  if (nums >= minutes && nums < hour) {
    let time = getTimer(nums, minutes, minutes, "m");

    timer = time;
  }
  if (nums >= day && nums < week) {
    let time = getTimer(nums, day, minutes, "d");
    timer = time;
  }
  if (nums >= week && nums < month) {
    let time = getTimer(nums, week, minutes, "w");
    timer = time;
  }
  if (nums >= month && nums < year) {
    let time = getTimer(nums, month, minutes, "mnt");
    timer = time;
  }
  if (nums >= year) {
    let time = getTimer(nums, year, minutes, "yr");
    timer = time;
  }
  if (nums <= 59) {
    let time = getTimer(nums, week, minutes, "s");
    timer = time;
  }
  console.log(timer);
};
let m = 86400 * 31;
calcTimer(1790000010);
