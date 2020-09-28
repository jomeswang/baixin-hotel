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
  onLoad: function (options) {},


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
   * 查看订单详情
   */
  lookOrder(e) {
    console.log(e);
    console.log(this.data);
    console.log(e.currentTarget.dataset);
    console.log(e.currentTarget.dataset);
    console.log(this.data.data);


    const data = JSON.stringify(this.data.data[e.currentTarget.dataset.id])
    console.log(e.currentTarget.dataset);
    console.log(data);

    wx.navigateTo({
      url: '../hotel/hotelDetail/index?indexData=' + data,
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
    wx.showLoading({
      title: '加载中',
    })
    const that = this;
    const arr = [];
    const dataArr = [];
    wx.request({
      url: 'https://ht1.jomeswang.top/api/order?openid=' + app.globalData.openid,
      method: 'GET',
      header: {
        "x-access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Indhbmd4aW4iLCJpYXQiOjE1OTg0OTk1OTF9.89hr8flvp3L5-rsO182hLPUqzQTBC2x6relk7DipbrU"
      },
      success: res => {
        wx.hideLoading()
        console.log(res.data, '看一下');
        res.data.forEach(item => {
          const ele = JSON.parse(item)
          dataArr.push(ele)
          const obj = {
            price: ele.price,
            status: ele.status,
            startTime: ele.order_begin_time,
            endTime: ele.order_end_time,
            title: ele.order_room_type,
            // num: ele.form.order_room_num,
            night: this.calNight(ele.order_begin_time, ele.order_end_time)
          }
          arr.push(obj)
        });
        this.setData({
          cardArr: arr,
          data: dataArr,
        })
      },
      fail: res => {

        wx.hideLoading()
      }

    })


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