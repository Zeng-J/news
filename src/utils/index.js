function formatDate(date, format) {
  /**** utils.formatDate(value, "YY-MM-DD hh:m:ss") ****/

  date = new Date(date);
  let yy = date.getFullYear();
  let mm = date.getMonth() + 1;
  let dd = date.getDate();
  let hh = date.getHours();
  let m = date.getMinutes();
  let ss = date.getSeconds();
  let ms = date.getMilliseconds();
  mm = mm < 10 ? "0" + mm : mm;
  dd = dd < 10 ? "0" + dd : dd;
  hh = hh < 10 ? '0' + hh : hh;
  m = m < 10 ? '0' + m : m;
  ss = ss < 10 ? '0' + ss : ss;
  return format.toLowerCase()
      .replace('yy', yy)
      .replace('mm', mm)
      .replace('dd', dd)
      .replace('hh', hh)
      .replace('m', m)
      .replace('ss', ss)
      .replace('ms', ms);
};

function dateDiff(timestamp) {
  // 补全为13位
  var arrTimestamp = (timestamp + '').split('');
  for (var start = 0; start < 13; start++) {
      if (!arrTimestamp[start]) {
          arrTimestamp[start] = '0';
      }
  }
  timestamp = arrTimestamp.join('') * 1;

  var minute = 1000 * 60;
  var hour = minute * 60;
  var day = hour * 24;
  var halfamonth = day * 15;
  var month = day * 30;
  var now = new Date().getTime();
  var diffValue = now - timestamp;

  // 如果本地时间反而小于变量时间
  if (diffValue < 0) {
      return '不久前';
  }

  // 计算差异时间的量级
  var monthC = diffValue / month;
  var weekC = diffValue / (7 * day);
  var dayC = diffValue / day;
  var hourC = diffValue / hour;
  var minC = diffValue / minute;

  // 数值补0方法
  var zero = function (value) {
      if (value < 10) {
          return '0' + value;
      }
      return value;
  };

  if (monthC > 12) {
      // 超过1年，直接显示年月日
      return (function () {
          var date = new Date(timestamp);
          return date.getFullYear() + '年' + zero(date.getMonth() + 1) + '月' + zero(date.getDate()) + '日';
      })();
  } else if (monthC >= 1) {
      return parseInt(monthC) + "月前";
  } else if (weekC >= 1) {
      return parseInt(weekC) + "周前";
  } else if (dayC >= 1) {
      return parseInt(dayC) + "天前";
  } else if (hourC >= 1) {
      return parseInt(hourC) + "小时前";
  } else if (minC >= 1) {
      return parseInt(minC) + "分钟前";
  }
  return '刚刚';
};

const utils = {
  formatDate,
  dateDiff,
}

export default utils;