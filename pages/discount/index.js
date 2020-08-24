// pages/discount/index.js
wx.cloud.init();
const db = wx.cloud.database();
let inputTimer = null; //输入优惠码定时器
const inputInterval = 1000; //输入间隔多久就请求验证该优惠券
let openid = ''; //用户的openid
const app = getApp();


Page({

  /**
   * 页面的初始数据
   */
  data: {
    showCodeInput: true, //是否显示输入框
    showDiscountCard: false, //是否显示优惠券
    showIndex: 0, //显示的优惠券类别
    eatCardArr: [], //餐饮券数组
    roomCardArr: [], //客房券数组
    chessCardArr: [], //棋牌券数组
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getDiscountCard();


  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    if(app.cardChange){//若优惠券变化了
      this.getDiscountCard()
      app.cardChange=false
    }
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },


  /**
   * 监听优惠券码输入
   * @param {string} e 输入信息
   */
  handleInput(e) {
    clearInterval(inputTimer);
    wx.hideToast(); //每次输入就去掉可能存在的toast
    const value = e.detail
    if (value) { //若有输入
      inputTimer = setTimeout(() => {
        wx.showLoading({
          title: '获取中',
        })
        db.collection('coupon').where({
          id: value
        }).get().then(res => {
          wx.hideLoading();

          if (res.data.length) { //若获取数据不为空
            return ''
          } else { //获取为空
            wx.showToast({
              title: '您输入的提取码错误',
              duration: 3000,
              icon: 'none'
            })
          }
        })
      }, inputInterval)
    }
  },


  async getDiscountCard() {
    let res = '';
    const eatCardArr = [];
    const roomCardArr = [];
    const chessCardArr = [];
    res = await db.collection('coupon').where({
      user: ""
    }).get()

    res.data.forEach((item, index) => {
      const canUse = !this.isOverdue(item.endDate)
      // canUse ? '' : continue
      if (canUse) { //若不过期
        const startMonth = item.startDate.split('-')[1];
        const startDay = item.startDate.split('-')[2];
        const endMonth = item.endDate.split('-')[1];
        const endDay = item.endDate.split('-')[2];
        const startHour = item.startTime.split(':')[0];
        const startSecond = item.startTime.split(':')[1];
        const endHour = item.endTime.split(':')[0];
        const endSecond = item.endTime.split(':')[1];

        const obj = {
          _id: item._id,
          cardType: item.type,
          title: item.title,
          startMonth,
          startDay,
          endMonth,
          endDay,
          startHour,
          startSecond,
          endHour,
          endSecond,
          number: item.message.num,
          disType: item.message.type,
          condition: item.message.condition,
          isInTime: this.isInTime(item.startTime, item.endTime),
          times: item.times
        }
        switch (item.type) {
          case '餐饮券':
            eatCardArr.push(obj);
            break;
          case '客房券':
            roomCardArr.push(obj);
            break;
          case '棋牌券':
            chessCardArr.push(obj);
            break;

        }
        this.setData({
          eatCardArr,
          roomCardArr,
          chessCardArr
        })
      }


    })
  },

  /**
   * 判断优惠券是否过期
   * @param {string} startTime 
   * @param {string} endTime 
   */
  isInTime(startTime, endTime) {
    const year = new Date().getFullYear();
    const month = new Date().getMonth() + 1;
    const day = new Date().getDate();
    const startTimeStamp = new Date(year + '-' + month + '-' + day + ' ' + startTime).getTime()
    const endTimeStamp = new Date(year + '-' + month + '-' + day + ' ' + endTime).getTime()
    const nowTimeStamp = new Date().getTime();
    return nowTimeStamp > startTimeStamp && nowTimeStamp < endTimeStamp

  },

  /**
   * 判断优惠券是否过期
   * @param {string} date 日期
   */
  isOverdue(date) {
    const nowtime = new Date().getTime();
    const cardTime = new Date(date).getTime() + 24000 * 3600; //当天过了才过期
    return nowtime > cardTime
  },



  /**
   * 改变显示优惠券类型
   * @param {*} e 
   */
  ChangeItems(e) {
    this.setData({
      showIndex: e.currentTarget.dataset.index
    })
  },

  handleButton(e) {
    console.log(2);
    console.log(e);

    const index = e.detail.currentTarget.dataset.id
    switch (e.detail.currentTarget.dataset.type) {
      case '餐饮券':
        this.data.eatCardArr[index].isInTime ? wx.navigateTo({
          url: '../useCard/index?card=' + JSON.stringify(this.data.eatCardArr[index])
        }) : wx.showToast({
          title: '当前不在时间点',
          icon: 'none'
        })
        break;
      case '客房券':
        this.data.roomCardArr[index].isInTime ? wx.navigateTo({
          url: 'url',
        }) : wx.showToast({
          title: '当前不在时间点',
          icon: 'none'
        })
        break;
      case '棋牌券':
        this.data.chessCardArr[index].isInTime ? wx.navigateTo({
          url: 'url',
        }) : wx.showToast({
          title: '当前不在时间点',
          icon: 'none'
        })
        break;
    }
  }


})