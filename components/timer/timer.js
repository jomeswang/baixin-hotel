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

Component({
  /**
   * 组件的属性列表
   */

  properties: {
    timevalue: {
      type: Array,
      value: "标题"
    },
    years: {
      type: Array,
      value: "年"
    },
    months: {
      type: Array,
      value: "月"
    },
    days: {
      type: Array,
      value: "日"
    },
    hours: {
      type: Array,
      value: "小时"
    },
    minutes: {
      type: Array,
      value: "分钟"
    }
  },
  /* 组件的初始数据*/
  data: {
    startDate: '',
    currentDate: '',
    endOfStartDate: '',
    endDate: '',
    endOfEndDate: '',
    startDay: '',
    startMonth: '',
    startWeek: '',
    endDay: '',
    endMonth: '',
    endWeek: '',
    dayCount: 1,



  },
  /** 组件的方法列表 **/
  methods: {
    //取消
    canslebtn() {
      this.triggerEvent("canslebtn");
    },
    //确认
    closebtn() {
      this.triggerEvent("closebtn");
    },
    // 调用父组件  事件
    fnbindChange(e) {
      this.triggerEvent("bindChangeEvent", e.detail);
    }
  }
})