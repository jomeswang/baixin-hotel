//app.js
wx.cloud.init()
App({
  data:{
    isConnect:null
  },
  
  

  onLaunch: function () {
    // 展示本地存储能力
    const that = this;
    console.log(111)
    this.testWss()
    
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)


    // 通过云函数获取用户的openid
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        that.globalData.openid = res.result.openid;
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
      }
    })


    // 退款函数
    // wx.cloud.callFunction({
    //   name: 'refund',
    //   data: {
    //     id,
    //     total_fee,
    //     refund_fee,
    //   },
    //   success: res => {
    //     console.log(res)
    //   },
    //   fail: rej => {
    //     console.log(rej)
    //   }
    // })







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
  // startClick(even) {
  //   wx.connectSocket({
  //     url: 'ws://159.138.27.178:9999',
  //     method: 'GET',
  //     success: (res) => {
  //       isConnect: true
  //       console.log("连接成功", res)
  //     },
  //     fail: (res) => {
  //       isConnect: false
  //       console.log("连接失败", res)
  //     }
  //   });

  //   wx.onSocketOpen((res) => {
  //     console.log('WebSocket连接已打开！')
  //   });

  //   wx.onSocketError((res) => {
  //     console.log('WebSocket连接打开失败，请检查！')
  //   })
  // },

  // sendClick: function (even) {
  //   wx.sendSocketMessage({
  //     data: "From微信小程序 web socket"
  //   })
  // },

  // closeClick(even) {
  //   wx.closeSocket({
  //     success: (res) => {
  //       console.log("关闭成功...")
  //     },
  //     fail: (res) => {
  //       console.log("关闭失败...")
  //     }
  //   });
  //   wx.onSocketClose((res)=>  {
  //     console.log("WebSocket连接已关闭")
  //   })
  // },
  // 立旺的socket

  testWss(){
        wx.connectSocket({
          url: 'ws://159.138.27.178:9998'
        })
        wx.onSocketOpen(function (res) {
          console.log('WebSocket连接已打开！')
        })
        wx.onSocketOpen(function (res) {
          setInterval(()=>{
            wx.sendSocketMessage({
              data: "weapp message"
            })
          }, 20000)
    
        })
        wx.onSocketMessage(function (res) {
          console.log('小程序收到服务器消息：' + res.data)
        })
      }

})