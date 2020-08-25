//app.js
App({
  data:{
    isConnect:null
  },
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        
      }

    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  onShow(options){
    wx.onSocketMessage((res) => {
      console.log(res.data)
      console.log(res)
    })
  },
  
  globalData: {
    userInfo: null
  },
  startClick(even) {
    wx.connectSocket({
      url: 'ws://159.138.27.178:9999',
      method: 'GET',
      success: (res) => {
        isConnect: true
        console.log("连接成功", res)
      },
      fail: (res) => {
        isConnect: false
        console.log("连接失败", res)
      }
    });

    wx.onSocketOpen((res) => {
      console.log('WebSocket连接已打开！')
    });

    wx.onSocketError((res) => {
      console.log('WebSocket连接打开失败，请检查！')
    })
  },

  sendClick: function (even) {
    wx.sendSocketMessage({
      data: "From微信小程序 web socket"
    })
  },

  closeClick(even) {
    wx.closeSocket({
      success: (res) => {
        console.log("关闭成功...")
      },
      fail: (res) => {
        console.log("关闭失败...")
      }
    });
    wx.onSocketClose((res)=>  {
      console.log("WebSocket连接已关闭")
    })
  },

})