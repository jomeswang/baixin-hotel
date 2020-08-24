// pages/mine/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {},

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
   * 进入优惠券历史
   */
  enterDisHis() {
    wx.navigateTo({
      url: '../history_discount/index',
    })
  },

  /**
   * 进入订房历史
   */
  enterHotelHis() {
    wx.navigateTo({
      url: '../history_hotel/index',
    })
  },
  /**
   * 打电话
   */
  callPhone() {
    wx.makePhoneCall({
      phoneNumber: '15816542132',
    })
  }

})