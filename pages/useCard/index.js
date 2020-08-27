// pages/useCard/index.js
wx.cloud.init();
const db = wx.cloud.database()
let openid = ''; //用户的openid
let inputTimer = null; //输入框定时器
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cardArr: [], //优惠券
    money: 0.00, //消费原金额
    actPay: 0.00, //实付金额
  },
  billNo: '', //订单号

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log([JSON.parse(options.card)]);
    const card = JSON.parse(options.card)
    console.log(card);

    this.setData({
      cardArr: [card],
      type: card.title.slice(0, -1),
      time: this.getNowTime(),
      discount: card.number.toFixed(2)
    })


  },

  /**
   * 获取当前时间
   */
  getNowTime() {
    const date = new Date()
    const year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let hour = date.getHours();
    let minute = date.getMinutes();
    month = month < 10 ? '0' + month : month
    day = day < 10 ? '0' + day : day
    hour = hour < 10 ? '0' + hour : hour
    minute = minute < 10 ? '0' + minute : minute
    return year + '-' + month + '-' + day + ' ' + hour + ':' + minute
  },

  /**
   * 监听优惠券码输入
   * @param {string} e 输入信息
   */
  handleInput(e) {

    // clearInterval(inputTimer);
    console.log(e.detail);
    console.log(+e.detail);

    const value = +e.detail
    // inputTimer = setTimeout(() => {
    this.calMoney(value);
    this.setData({
      money: value.toFixed(2)
    })
    // }, 500)
  },

  /**
   * 计算应付金额
   * @param {number} value 原金额
   */
  calMoney(value) {
    let actPay = 0
    switch (this.data.cardArr[0].disType) {
      case 'money':
        actPay = value - this.data.cardArr[0].number
        break;
      case 'discount':
        actPay = value * this.data.cardArr[0].number / 10
        break;
    }
    actPay = actPay > 0 ? actPay : 0
    this.setData({
      actPay: actPay.toFixed(2)
    });
  },

  /**
   * 监听支付事件
   */
  handlePay() {
    const card = this.data.cardArr[0]
    const money = this.data.money;
    const condition = card.condition
    console.log(card, 111);
    const that = this;
    if (money > condition) {
      const card = this.data.cardArr[0];
      this.billNo = this.productBillNo(30);
      console.log(that.billNo, 'billno');

      wx.cloud.callFunction({
        name: 'wepay',
        data: {
          "body": card.title,
          "outTradeNo": that.billNo,
          "spbillCreateIp": "127.0.0.1",
          "subMchId": "1535262541",
          "totalFee": this.data.actPay * 100, //因为单位为分
          "envId": "test-yb8a7",
          "totalFee": 1,
          "functionName": "pay_cb",
        },
        success: res => {
          const payment = res.result.payment

          wx.requestPayment({
            ...payment,
            success(res) {
              console.log('pay success', res)
              that.pushbill() //推送账单
              that.removeDisCard(card._id) //删除该优惠券
              wx.redirectTo({
                url: '../showPay/index?money=' + that.data.money,
              })
            },
            fail(err) {
              console.log('pay fail', err)
            }
          })
        },
        fail: console.error,
      })
    } else if (money > 0) {
      wx.showModal({
        title: '温馨提示',
        content: '该消费券的使用门槛为满' + condition + '可用，输入金额应大于消费券使用门槛',
        showCancel: false,
        confirmColor: '#EB4A42'
      })
    } else {
      wx.showToast({
        title: '请输入消费原金额',
        icon: 'none',
        duration: 3000
      })
    }
  },

  /**
   * 向数据库存入账单
   */
  pushbill() {
    const card = this.data.cardArr[0]
    wx.request({
      url: 'http://159.138.27.178:3000/api/orderForm/new',
      method: 'POST',
      header:{
        "x-access-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Indhbmd4aW4iLCJpYXQiOjE1OTg0OTk1OTF9.89hr8flvp3L5-rsO182hLPUqzQTBC2x6relk7DipbrU"
      },
      data: {
        openid: app.globalData.openid,
        id: this.billNo,
        disType: card.disType,
        disName: card.title,
        oriPay: this.data.money,
        disNum: card.number,
        actPay: this.data.actPay,
        time: Date.now(),
        couponType: card.type,
        user: card.user,
      }
    })

    // const card = this.data.cardArr[0]
    // db.collection('orderForm').add({
    //   data: {
    //     openid: '',
    //     id: this.productBillNo(30),
    //     disType: card.disType,
    //     disName: card.title,
    //     oriPay: this.data.money,
    //     disNum: card.number,
    //     actPay: this.data.actPay,
    //     time: Date.now(),
    //     couponType: card.type,
    //     user: '',
    //   }
    // })
  },

  /**
   * 生成账单号
   * @param {number} len 生成的长度
   */
  productBillNo(len) {
    let str = '';
    for (let i = 0; i < len; i++) {
      str += ~~(Math.random() * 10)
    }
    return str
  },

  /**
   * 删除优惠券
   * @param {string} id 
   */
  async removeDisCard(id) {
    wx.request({
      url: 'http://159.138.27.178:3000/api/event/fix',
      method: 'POST',
      header:{
        "x-access-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Indhbmd4aW4iLCJpYXQiOjE1OTg0OTk1OTF9.89hr8flvp3L5-rsO182hLPUqzQTBC2x6relk7DipbrU"
      },
      data: JSON.stringify({
        _id: app.globalData.openid,
        status: 'done'
      }),
      success: res => {
        console.log(res);
      }
    })

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

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },
})