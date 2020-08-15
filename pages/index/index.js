//index.js
//获取应用实例
var app = getApp();
var locationUrl = 'http://apis.map.qq.com/ws/geocoder/v1/';
const tencentMapKey = 'ZNDBZ-W3YR6-6KXSB-MLKXV-6HFXK-UMFOT';

var currentYear = new Date().getFullYear();
var currentMonth = new Date().getMonth() + 1;
var currentDay = new Date().getDate();
var currentWeek = new Date().getDay();
var currentDate = currentYear + '-' + currentMonth + '-' + currentDay;

var startDate = '';
var startYear;
var startDay;
var startMonth;
var startWeek;
var endOfStartDate = '2020-12-31';
var startDayCount;

var endDate = '';
var endYear;
var endDay;
var endMonth;
var endWeek;
var endOfEndDate = '2020-12-31';

var dayCount = 1;

Page({
  data: {
    homeAdvertises: [
      {
           'imgSrc': '../../res/images/text-adver.jpg',
           'webUrl': ''
      },
      {
           'imgSrc': '../../res/images/text-adver.jpg',
           'webUrl': ''
      },
      {
           'imgSrc': '../../res/images/text-adver.jpg',
           'webUrl': ''
      }
    ],
  },
  //事件处理函数
  bindViewTap: function() {

  },
  onLoad: function () {

  },
  getUserInfo: function(e) {

  }
})
