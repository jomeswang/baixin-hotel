// const app = getApp();
const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const requestwebsocket = {
  testWss(openid) {
    console.log('进来了', openid);

    wx.connectSocket({
      url: 'ws://159.138.27.178:9998'
    })
    wx.onSocketOpen(function (res) {
      console.log('WebSocket连接已打开！')
    })
    wx.onSocketOpen(function (res) {
      setInterval(() => {
        wx.sendSocketMessage({
          data: "weapp message"
        })
      }, 20000)

    })
    wx.onSocketMessage(function (res) {
      console.log('小程序收到服务器消息：' + res.data)
      //判断是否是小程序自己的订单  使用openid进行判断；
      if (res.data["openid"] == openid) {
        // 退款函数
        wx.cloud.callFunction({
          name: 'refund',
          data: {
            id: res.data.data.outTradeNo,
            total_fee: parseInt(this.data.price) + parseInt(this.data.deposit),
            refund_fee: parseInt(this.data.price) + parseInt(this.data.deposit),
          },
          success: res => {
            console.log(res)
          },
          fail: rej => {
            console.log(rej)
          }
        })

        //进行云支付  获取订单的微信支付的账单号1 进行  退款操作//
        //"数据格式是样子的返回的  你们需要的就进行退款  "{"_id":"6518b7395f46a0b400661cbe17967b88","counters":23,"currentTime":"2020/08/27 01:48:44","deposit":"100","form":{"order_name":"111","order_phone_number":"11","order_room_num":"11"},"id":"2","last_time":"1","openid":"oaFmY5GCGMCqfaAPRNOEqM3cHgZc","order_begin_time":"2020-8-27","order_end_time":"2020-8-28","order_room_type":"豪华大房","outTradeNo":"004148993049919259340776303834","pic_List":["http://159.138.27.178:8000/upload_be6dc75a0f3e8f4fb7156914acf9d805.png"],"price":"2000","reachTime":"12:01","status":"已取消"}""
      }
      //字段都有   金额大小  是price   openid你们在订单里面插入  不是数据的问题     

    })
  },
  pushmess(order) {
    wx.onSocketOpen(function (res) {

      wx.sendSocketMessage({
        data: "weapp message"
        //data为订单数据 order // 并且对应的操作为进行 status改为“已取消”，own = 1
        //方法调用   ----  在小程序进行取消订单的时候
      })

    })
  }

}
const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  api: requestwebsocket,
  formatTime: formatTime
}