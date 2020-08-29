// pages/hotel/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    data: {},
  },
  /**
   * 取消订单
   */
  cancelOrder() {
    console.log(this.data.data.price + this.data.data.deposit);
    console.log(this.data);
    const data = this.data.data;
    data.status = '已取消';
    data.own = 1;
    this.setData({
      data
    })

    const that = this;
    // 退款函数
    wx.cloud.callFunction({
      name: 'refund',
      data: {
        id: this.data.data.outTradeNo,
        total_fee: parseInt(this.data.data.price),
        refund_fee: parseInt(this.data.data.price),
      },
      success: res => {
        console.log(res)
        wx.request({
          url: 'http://baixingapi.jomeswang.top/api/order/update',
          method: "POST",
          header: {
            "x-access-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Indhbmd4aW4iLCJpYXQiOjE1OTg0OTk1OTF9.89hr8flvp3L5-rsO182hLPUqzQTBC2x6relk7DipbrU"
          },
          data,
        })
      },
      fail: rej => {
        console.log(rej)
      }
    })



  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);

    console.log(options.indexData);
    console.log(JSON.parse(options.indexData));
    const data = JSON.parse(options.indexData);
    this.setData({
      data,
    })


    // this.setData({
    //   indexData:options.indexData
    // })
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
    // 电话号码
    callPhone() {
      wx.makePhoneCall({
        phoneNumber: '‭075586298588‬',
      })
    },
    backToIndex(){
      wx.switchTab({
        url: '../../index/index',
      })
    },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
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
    hideModal: function () {
    // 隐藏遮罩层
    var animation = wx.createAnimation({
     duration: 200,
     timingFunction: "linear",
     delay: 0
    })
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