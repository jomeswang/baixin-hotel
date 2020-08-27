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
//首页收到的数据
var id;
var name;
var description;
var area;
var bed;
var peopleNum;
var addBed;
var morningTea;
var window;
var bathroom;
var convenience;
var guestRoom;
var introduction;
var price;
var deposit;
var imgUrl;
var read;
var bookKnow;
var roomNum;
var arr1 = ""
// 点赞


Page({
  data: {
    homeAdvertises: [{
        'imgSrc': '../../res/images/text-adver.png',
        'webUrl': ''
      },
      {
        'imgSrc': '../../res/images/text-adver.png',
        'webUrl': ''
      },
      {
        'imgSrc': '../../res/images/text-adver.png',
        'webUrl': ''
      }
    ],
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
    // hotel
    hotelName: '',
    hotelAddress: '',
    // 点赞
    likes: 1,
    // 首页得到的数据
    id: "",
    name: "",
    description: "",
    area: "",
    bed: "",
    peopleNum: "",
    addBed: "",
    morningTea: "",
    window: "",
    bathroom: "",
    convenience: "",
    guestRoom: "",
    introduction: "",
    price: "",
    deposit: "",
    imgUrl: "",
    read: "",
    bookKnow: "",
    roomNum: "",
    roomArr: [],
    showArr: [],
    // 用于判定的房间数量
    indexdata:[],

    // roomArray: [{
    //   image: '../../res/images/ic_hotel_image.png',
    //   name: '标准单人间',
    //   service: 'WiFi/有窗/空调',
    //   eating: "早饭",
    //   time: "当天18:00前可免费取消",
    //   price: 158,


    // }, {
    //   image: '../../res/images/ic_hotel_image.png',
    //   name: '标准双人间',
    //   service: 'WiFi/有窗/空调',
    //   price: 258
    // }, {
    //   image: '../../res/images/ic_hotel_image.png',
    //   name: '豪华单人间',
    //   service: 'WiFi/有窗/空调',
    //   price: 198
    // }, {
    //   image: '../../res/images/ic_hotel_image.png',
    //   name: '豪华双人间',
    //   service: 'WiFi/有窗/空调',
    //   price: 358
    // }, ],
  },
  //事件处理函数
  bindViewTap: function () {

  },
  onLoad: function () {


    startDate = currentDate;
    startYear = currentYear;
    startDay = currentDay;
    startMonth = currentMonth;
    startWeek = currentWeek;


    this.initEndDate();

    this.setSearchDate();
    wx.request({
      url: 'http://159.138.27.178:3000/api/room/',
      method: "GET",
      header:{
        "x-access-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Indhbmd4aW4iLCJpYXQiOjE1OTg0OTk1OTF9.89hr8flvp3L5-rsO182hLPUqzQTBC2x6relk7DipbrU"
      },
      success: e => {
        e.data.forEach((item, index) => {

          // console.log(JSON.parse(item))
          this.setData({
            roomArr: this.data.roomArr.concat(JSON.parse(item)),
          })

        })

        // this.setData({
        //   arr1:JSON.parse(e)
        console.log(this.data.roomArr)
        // })
        // console.log( 
        //   this.data.arr1)

      }

    })

  },
  likesItem: function (e) {
    wx.showToast({
      title: '感谢您的认可，亲~',
    })
    // console.log(this.data.likes)
    // if (this.data.likes === 1) {
    //   this.setData({
    //     likes: 0
    //   })
    // } else
    //   this.setData({
    //     likes: 1
    //   })

    //   if (likes===1) {
    //     likes=0
    // }
    // else
    //   likes=1
  },



  // 时间选择
  startDateChange: function (e) {
    console.log(e);
    startDate = e.detail.value;
    var startArray = startDate.split('-');
    startYear = parseInt(startArray[0]);
    startDay = parseInt(startArray[2]);
    startMonth = parseInt(startArray[1]);
    startWeek = new Date(startYear, startMonth, startDay).getDay();

    var startFormat = this.formatDate(startDate);
    var endFormat = this.formatDate(endDate);
    if (new Date(endFormat) < new Date(startFormat)) {
      this.initEndDate();
    }

    this.setSearchDate();
  },
  endDateChange: function (e) {
    console.log(e);
    endDate = e.detail.value;
    var endArray = endDate.split('-');
    endYear = parseInt(endArray[0]);
    endDay = parseInt(endArray[2]);
    endMonth = parseInt(endArray[1]);
    endWeek = new Date(endYear, endMonth, endDay).getDay();

    this.setSearchDate();
  },

  getWeekday: function (week) {
    var weekday = new Array(7)
    weekday[0] = "周日"
    weekday[1] = "周一"
    weekday[2] = "周二"
    weekday[3] = "周三"
    weekday[4] = "周四"
    weekday[5] = "周五"
    weekday[6] = "周六"

    return weekday[week];
  },

  prefixInteger: function (num, length) {
    return (Array(length).join('0') + num).slice(-length);
  },

  getDayCount: function (startDate, endDate) {
    var startFormat = this.formatDate(startDate);
    var endFormat = this.formatDate(endDate);
    console.log(startFormat + "->" + endFormat);
    var start = new Date(startFormat);
    var end = new Date(endFormat);

    // console.log(start + "->" + end);
    var result = end - start;
    if (result >= 0) {
      var days = parseInt(result / (1000 * 60 * 60 * 24));
      return days == 0 ? 1 : days;
    } else {
      return 0;
    }
  },


  formatDate: function (date) {
    return date.replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '').replace(/(-)/g, '/');
  },

  initEndDate: function () {
    startDayCount = new Date(startYear, startMonth, 0).getDate();

    if (startMonth == 12 && startDay == 31) {
      endYear = startYear + 1;
      endMonth = 1;
      endDay = 1;
    } else {
      endYear = startYear;
      if (startDay <= startDayCount) {
        endMonth = startMonth
        endDay = startDay + 1;
      } else {
        endMonth = startMonth + 1;
        endDay = 1;
      }
    }
    if (currentWeek >= 7) {
      endWeek = 1;
    } else {
      endWeek = currentWeek + 1;
    }
    endDate = endYear + '-' + endMonth + '-' + endDay;
  },

  setSearchDate: function () {
    this.setData({
      currentDate: currentDate,

      startDate: startDate,
      startDay: this.prefixInteger(startDay, 2),
      startMonth: this.prefixInteger(startMonth, 2),
      startWeek: this.getWeekday(startWeek),
      endOfStartDate: '2020-12-31',

      endDate: endDate,
      endDay: this.prefixInteger(endDay, 2),
      endMonth: this.prefixInteger(endMonth, 2),
      endWeek: this.getWeekday(endWeek),
      endOfEndDate: '2020-12-31',

      dayCount: this.getDayCount(startDate, endDate)
    });
  },
  // 电话号码
  callPhone() {
    wx.makePhoneCall({
      phoneNumber: '‭075586298588‬',
    })
  },
  // 订房的跳转
  handleItem(e) {
    const index = e.currentTarget.dataset.id
    console.log(this.data.roomArr[index]);
    this.setData({
      indexdata:this.data.roomArr[index]
    })
    if(this.data.roomArr[index].roomNum<=0){
      wx.showToast({
        title: '没房咯，亲~',
      })
    }
    
    
    
    if(this.data.roomArr[index].roomNum>0){
    wx.navigateTo({
      // url: '../../pages/hotel/bookHotel/index?startDate=' + this.data.startDate + "&endDate=" + this.data.endDate + "&dayCount=" + this.data.dayCount + "&name=" + this.data.name + "&read=" + this.data.read + "&price=" + this.data.price + "&deposit=" + this.data.deposit + "&status" + this.data.status,
      url: '../../pages/hotel/bookHotel/index?indexData=' + JSON.stringify(this.data.roomArr[index]) + "&startDate=" + this.data.startDate + "&endDate=" + this.data.endDate + "&dayCount=" + this.data.dayCount
    })}
  },
  
  //点击我显示底部弹出框
  hotelItemTap: function (e) {
    const index = e.currentTarget.dataset.id

    this.setData({
      showArr: this.data.roomArr[index]
    })
    console.log(this.data.showArr);
    this.showModal();
  },


  //显示对话框
  showModal: function () {
    // 显示遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
      showModalStatus: true
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export()
      })
    }.bind(this), 200)
  },
  //隐藏对话框
  hideModal: function () {
    // 隐藏遮罩层
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: "linear",
      delay: 0
    })
    //  点赞



    this.animation = animation
    animation.translateY(300).step()
    this.setData({
      animationData: animation.export(),
    })
    setTimeout(function () {
      animation.translateY(0).step()
      this.setData({
        animationData: animation.export(),
        showModalStatus: false
      })
    }.bind(this), 200)
  }
})