// pages/bookHotel/bookHotel.js
// 接口有数据后来这里绑定
var roomPrice;
var hotelName;
var roomName;
var startDate;
var endDate;
var dayCount

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isDiscount: false,
    roomPrice,
    hotelName,
    roomName,
    startDate,
    endDate,
    discount: '598',
    dayCount
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 放入接口请求的   后面我看看

    roomPrice = options.price;
    hotelName = options.hotelName;
    roomName = options.roomName;
    startDate = options.startDate;
    endDate = options.endDate;
    dayCount=options.dayCount

    this.setData({
      roomPrice: roomPrice,
      hotelName: hotelName,
      roomName: roomName,
      startDate: startDate,
      endDate: endDate,
      dayCount:dayCount
  

    });
  },
 handleItem(e){
    wx.navigateTo({
      url: '../hotelDetail/index',
      
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