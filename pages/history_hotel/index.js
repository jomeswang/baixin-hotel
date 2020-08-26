// pages/history_hotel/index.js
const app = getApp();
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
    const that = this;
    const arr = [];
    wx.request({
      url: 'http://159.138.27.178:3000/api/order?openid=' + app.globalData.openid,
      method: 'GET',
      success: res => {
        console.log(res.data, '看一下');
        res.data.forEach(item => {
          const ele = JSON.parse(item)
          const obj = {
            price: ele.price,
            status: ele.status,
            startTime: ele.order_begin_time,
            endTime: ele.order_end_time,
            title: ele.order_room_type,
            num: ele.form.order_room_num,
            night: this.calNight(ele.order_begin_time, ele.order_end_time)
          }
          arr.push(obj)
        });
        this.setData({
          cardArr: arr
        })
      }
    })


  },

  /**
   * 计算住的晚上数
   * @param {string} startTime 入住时间
   * @param {*} endTime 离开时间
   */
  calNight(startTime, endTime) {
    return (new Date(endTime).getTime() - new Date(startTime).getTime()) / 24 / 3600 / 1000
  },

  /**
   * 跳转到首页
   */
  enterIndex() {
    wx.switchTab({
      url: '../index/index',
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

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})