// pages/bookHotel/bookHotel.js
// 接口有数据后来这里绑定
var roomPrice;
var hotelName;
var roomName;
var startDate;
var endDate;
var dayCount;
var name;
var read;
var price;
var deposit;
var status;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isDiscount: false,
    
    name,
    startDate,
    endDate,
    dayCount,
    read,
    price,
    deposit,
    status
    

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 放入接口请求的   后面我看看
    
    // roomPrice = options.price;
    // hotelName = options.hotelName;
    // roomName = options.roomName;
    name=options.name;
    startDate = options.startDate;
    endDate = options.endDate;
    dayCount=options.dayCount;
    read=options.read;
    price=options.price;
    deposit=options.deposit;
    status=options.status
    

    this.setData({
      name:name,
      startDate: startDate,
      endDate: endDate,
      dayCount:dayCount,
      read:read,
      price:price,
      deposit:deposit,
      status:"待确认"


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