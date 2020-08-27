// pages/history_discount/index.js
const app = getApp();
wx.cloud.init();
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cardArr: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const arr = [];
    // const that = this;
    // wx.request({
    //   url: 'http://159.138.27.178:3000/api/orderForm?openid=123',
    //   method: 'GET',
    //   success: res => {
    //     console.log(res.data, '看一下');
    //     that.setData({
    //       cardArr: JSON.parse(res.data)
    //     })
    //   }
    // })
    db.collection('orderForm').where({
      openid: app.globalData.openid
    }).get().then(res => {
      console.log(res.data);
      res.data.forEach(item => {
        item.time = this.getTime(item.time)
        arr.push(item)
      })
      console.log(arr, 'arr');

      this.setData({
        cardArr: arr
      })
    })
  },
  /**
   * 获取当前时间
   */
  getTime(time) {
    const date = new Date(time)
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
   * 跳转到优惠页
   */
  enterDiscount() {
    wx.switchTab({
      url: '../discount/index',
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