// components/HotelCard/HotelCard.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    roomArr: {
      type: Array
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    callPhone() {
      wx.makePhoneCall({
        phoneNumber: '‭075586298588‬',
      })
    }

  }
})