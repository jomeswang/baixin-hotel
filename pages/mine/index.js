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
      url: '../../pages/history_hotel/index',
    })
  },
  /**
   * 打电话
   */
  callPhone() {
    wx.makePhoneCall({
      phoneNumber: '‭075586298588‬',
    })
  },
  /**
   * 导航
   */
  navigate() {

    //ggz-
    // return
    // let plugin = requirePlugin('routePlan');
    // let key = '4AQBZ-CY5CF-XDTJ7-NBQDG-7T6LJ-QCF2A'; //使用在腾讯位置服务申请的key
    // let referer = '百姓渔村'; //调用插件的小程序的名称
    // let endPoint = JSON.stringify({ //终点
    //   'name': '百姓渔村',
    //   'latitude': 39.894806,
    //   'longitude': 116.321592
    // });
    // wx.navigateTo({
    //   url: 'plugin://routePlan/route-plan?key=' + key + '&referer=' + referer + '&endPoint=' + endPoint
    // });
    //~


    // //ggz+ 通过地图获取酒店位置
    // //temp
    //     wx.chooseLocation({
    //       latitude: 0,
    //       longitude: 0,
    //       success: (result) => {
    //         console.log(JSON.stringify(result))
    //       },
    //       fail: (res) => {},
    //       complete: (res) => {},
    //     })
    //     {"errMsg":"chooseLocation:ok","name":"百姓渔村(桂庙新村店)","address":"广东省深圳市南山区桂庙新村41号","latitude":22.525669,"longitude":113.932348}

    //打开内置地图，显示酒店位置（地图中可以点击导航）
    wx.openLocation({
      latitude: 22.525669,
      longitude: 113.932348,
      "name": "百姓渔村(桂庙新村店)",
      "address": "广东省深圳市南山区桂庙新村41号"
    })
    //~
  }

})