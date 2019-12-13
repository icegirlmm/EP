var app = getApp();
function formatTime(datetime) {
  // var date = new Date(datetime);
  // var month = date.getMonth() + 1;
  // var day = date.getDate();
  // var hour = date.getHours();
  // var minute = date.getMinutes();
  // return [month, day].map(formatNumber).join('-') + ' ' + [hour, minute].map(formatNumber).join(':');
  var date = new Date(datetime);
  var curdate = new Date();
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();
  var hour = date.getHours();
  var minute = date.getMinutes();
  var curyear = curdate.getFullYear();
  var curmonth = curdate.getMonth() + 1;
  var curday = curdate.getDate();
  var curhour = curdate.getHours();
  var curminute = curdate.getMinutes();
  var time = "";
  if (year == curyear) {
    if (month == curmonth && day == curday) { //是不是同一天
      time = time + "今天 " + formatNumber(hour) + ":" + formatNumber(minute);
    } else {
      let temp = new Date(curyear, curmonth - 1, curday);
      if (date.getTime() > temp.getTime() - 24 * 60 * 60 * 1000) {
        time = time + "昨天 " + formatNumber(hour) + ":" + formatNumber(minute);
      } else {
        time = time + formatNumber(month) + "-" + formatNumber(day) + " " + formatNumber(hour) + ":" + formatNumber(minute);
      }

    }
  } else {
    time = time + year + "-" + formatNumber(month) + "-" + formatNumber(day) + " " + formatNumber(hour) + ":" + formatNumber(minute);
  }
  return time;
}

function formatNumber(n) {
  n = n.toString();
  return n[1] ? n : '0' + n;
}


function formatDisplayTime(datetime) {
  var date = new Date(datetime);
  var curdate = new Date();
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();
  var hour = date.getHours();
  var minute = date.getMinutes();
  var curyear = curdate.getFullYear();
  var curmonth = curdate.getMonth() + 1;
  var curday = curdate.getDate();
  var curhour = curdate.getHours();
  var curminute = curdate.getMinutes();
  var time = "";
  if (year == curyear) {
    if (month == curmonth && day == curday) { //是不是同一天
      if (hour == curhour) {
        if (minute == curminute) {
          time = time + "现在";
        } else {
          time = time + (curminute - minute) + "分钟前";
        }
      } else {
        time = time + (curhour - hour) + "小时前";
      }
    } else {
      let temp = new Date(curyear, curmonth - 1, curday);
      if (date.getTime() > temp.getTime() - 24 * 60 * 60 * 1000) {
        time = time + "昨天 " + formatNumber(hour) + ":" + formatNumber(minute);
      } else {
        time = time + formatNumber(month) + "-" + formatNumber(day) + " " + formatNumber(hour) + ":" + formatNumber(minute);
      }

    }
  } else {
    time = time + year + "-" + formatNumber(month) + "-" + formatNumber(day) + " " + formatNumber(hour) + ":" + formatNumber(minute);
  }
  return time;
}

module.exports = {
  formatTime: formatTime,
  formatDisplayTime: formatDisplayTime
}
