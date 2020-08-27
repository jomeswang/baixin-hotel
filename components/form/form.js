const app = getApp();
var util = require("../../utils/util.js")
var DATE = util.formatTime(new Date())
let billNo = ''
Component({
  properties: {
    startDate: {
      type: String,
    },
    endDate: {
      type: String
    },
    dayCount: {
      type: String
    },
    indexData: {
      type: Object
    },
    sum: {
      type: String
    }

  },
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    index: null,
    time: '12:01',
    date: '2018-12-25',
    imgList: [],
    modalName: null,
    textareaAValue: '',
    textareaBValue: '',
    formList: {},
    pic_List: [],
    submitList: []

  },


  methods: {
    PickerChange(e) {


      console.log(e);
      this.setData({
        index: e.detail.value
      })
    },
    MultiChange(e) {
      this.setData({
        multiIndex: e.detail.value
      })
    },
    MultiColumnChange(e) {
      let data = {
        multiArray: this.data.multiArray,
        multiIndex: this.data.multiIndex
      };
      data.multiIndex[e.detail.column] = e.detail.value;

      this.setData(data);
    },
    TimeChange(e) {
   
      this.setData({
        time: e.detail.value
      })
    },
    DateChange(e) {
      this.setData({
        date: e.detail.value
      })
    },
    RegionChange: function (e) {
      this.setData({
        region: e.detail.value
      })
    },
    ChooseImage() {
      wx.chooseImage({
        count: 4, //默认9
        sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album'], //从相册选择
        success: (res) => {

          const tempFilepaths = res.tempFilePaths

          wx.uploadFile({

            filePath: tempFilepaths[0],
            name: 'file',
            url: 'http://159.138.27.178:3000/api/order/pic',
            success: res => {
              const data = "http://159.138.27.178:8000/" + res.data.slice(4)
              this.setData({
                pic_List: this.data.pic_List.concat(data)

              })
              console.log(this.data.pic_List)
              console.log(this.data.endDate)
            }
          })
          if (this.data.imgList.length != 0) {

            this.setData({
              imgList: this.data.imgList.concat(res.tempFilePaths)
            })

            console.log(this.data.pic_List)
          } else {
            this.setData({
              imgList: res.tempFilePaths
            })

          }
        }
      });
    },
    ViewImage(e) {
      wx.previewImage({
        urls: this.data.imgList,
        current: e.currentTarget.dataset.url
      });
      console.log(e)
    },
    DelImg(e) {
      wx.showModal({
        title: '亲爱的顾客',
        content: '确定要删除这张照片吗？',
        cancelText: '再看看',
        confirmText: '再见',
        success: res => {
          if (res.confirm) {
            this.data.imgList.splice(e.currentTarget.dataset.index, 1);
            this.setData({
              imgList: this.data.imgList
            })
          }
        }
      })
    },
    textareaAInput(e) {
      this.setData({
        textareaAValue: e.detail.value
      })
    },
    textareaBInput(e) {
      this.setData({
        textareaBValue: e.detail.value
      })
    },

    /**
     * 生成账单号
     * @param {number} len 生成的长度
     */
    productBillNo(len) {
      let str = '';
      for (let i = 0; i < len; i++) {
        str += ~~(Math.random() * 10)
      }
      console.log(str, '看看s');

      return str
    },
    //支付成功



    // 订单提交
    formSubmit: function (e) {
      const that = this;
      for (let key in e.detail.value) {
        console.log(key)
        if (e.detail.value[key] === "") {
          wx.showToast({
            title: '请填完',
          })
          return
        }
      }

      billNo = this.productBillNo(30)
      console.log(billNo, 'billNO');

      // 支付那一块
      wx.cloud.callFunction({
        name: 'wepay',
        data: {
          "body": this.data.indexData.name,
          "outTradeNo": billNo,
          "spbillCreateIp": "127.0.0.1",
          "subMchId": "1535262541",
          // "totalFee": this.data.sum * 100, //因为单位为分
          "totalFee": 11,
          "envId": "test-yb8a7",
          "functionName": "pay_cb",
        },
        success: res => {
          console.log(res, 'res');

          const payment = res.result.payment
          console.log(payment);

          wx.requestPayment({
            ...payment,
            success(res) {
              console.log('pay success', res)




              // 如果支付成功
              that.setData({
                formList: e.detail.value
              })
              console.log('form发生了submit事件，携带数据为：', that.data.formList),
                // 计数器  类似 id
                wx.request({
                  url: 'http://159.138.27.178:3000/api/order',
                  method: "GET",
                  data: {},
                  success: (res) => {
                    var max = 0;
                    console.log(res)
                    res.data.forEach(item => {

                      if (max - JSON.parse(item).counters < 0) {
                        max = JSON.parse(item).counters
                      }

                    })
                    console.log(app.globalData.openid, 'openid');
                    console.log(billNo);


                    wx.request({
                      url: 'http://159.138.27.178:3000/api/order/new',
                      method: "POST",
                      data: {
                        form: e.detail.value,
                        counters: max + 1,
                        id: "2",
                        pic_List: that.data.pic_List,
                        // 父页面传过来的的东西
                        last_time: that.data.dayCount,
                        order_begin_time: that.data.startDate,
                        order_end_time: that.data.endDate,
                        order_room_type: that.data.indexData.name,
                        price: that.data.indexData.price,
                        deposit: that.data.indexData.deposit,
                        openid: app.globalData.openid,
                        outTradeNo: billNo,
                        // 需要进行判断的时间
                        status: "待确认",
                        reachTime: that.data.time,
                        currentTime: DATE
                      },
                      success: function (e) {
                        // console.log(openid)
                        console.log("success"),
                          console.log(e)
                        wx.showToast({
                          title: '成功',
                        })
                        wx.navigateTo({
                          url: '../hotelDetail/index',
                        })



                      }

                    })
                  }

                })






            },
            fail(err) {
              console.log('pay fail', err)
            }
          })
        },
        fail: console.error,
      })








    },
  },

  // 订单提交


  // 以上都是UI自带的样式代码
  // 传值方法
  formbox() {


  }

})