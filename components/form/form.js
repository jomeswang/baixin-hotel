const app = getApp();
var util=require("../../utils/util.js")
var DATE=util.formatTime(new Date())
Component({
  properties:{
    startDate: {
      type: String,
    },
    endDate:{
      type:String
    },
    dayCount:{
      type:String
    },
    indexData:{
      type:Object
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
    formList:{},
    pic_List:[],
    submitList:[]

  },


  methods:{
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
    RegionChange: function(e) {
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
          
          const tempFilepaths=res.tempFilePaths
        
          wx.uploadFile({
        
            filePath: tempFilepaths[0],
            name: 'file',
            url: 'http://159.138.27.178:3000/api/order/pic',
            success:res=>{
              const data="http://159.138.27.178:8000/"+res.data.slice(4)
              this.setData({
              pic_List:this.data.pic_List.concat(data)
  
              })
              console.log(this.data.pic_List)
              console.log(this.data.endDate)
            }
          }
          )
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
      // 订单提交
      formSubmit: function (e) {
        this.setData({
          formList:e.detail.value
        })
        console.log('form发生了submit事件，携带数据为：', this.data.formList),
        
        wx.request({
          url: 'http://159.138.27.178:3000/api/order',
          method:"GET",
          data:{
          },
          success:(res)=>{
            var max=0;
            console.log(res)
            res.data.forEach(item=>{
             
              if(max-JSON.parse(item).counters<0){
                max=JSON.parse(item).counters
              }

            })
            wx.request({
              url: 'http://159.138.27.178:3000/api/order/new',
              method:"POST",
              data:{form:e.detail.value,
                counters:max+1,
                id:"2",
                pic_List:this.data.pic_List,
                // 父页面传过来的的东西
                last_time:this.data.dayCount,
                order_begin_time:this.data.startDate,
                order_end_time:this.data.endDate,
                order_room_type:this.data.indexData.name,
                price:this.data.indexData.price,
                deposit:this.data.indexData.deposit,
                // 需要进行判断的时间
                status:"待确认",
                reachTime:this.data.time,  
                currentTime:DATE
              },
              success:function(e){
                // console.log(openid)
                console.log("success"),
                console.log(e)
                wx.showToast({
                  title: '成功',
                })
      
              }
      
            })
          }
  
        })
      },
  },
  
    // 订单提交

 
  // 以上都是UI自带的样式代码
// 传值方法
formbox(){


}

})