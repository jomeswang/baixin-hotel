// components/discountCard/discountCard.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    cardArr: {
      type: Array,
      value: []
    },
    isUse: {
      type: Boolean,
      value: false
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
    handleButton(e) {
      this.triggerEvent('Button', e)
    },
    /**
     * 显示优惠券提示
     */
    handleTips() {
      wx.showModal({
        title: '详细使用说明',
        content: '1.优惠券仅限于规定有效期和规定有效时间使用；\n2.使用方法：在百姓渔村酒店完成服务后，结账时点击“立即使用”即可自动减免对应金额；\n3.使用优惠券的订单超时未支付或退出支付，优惠券继续有效；',
        showCancel: false,
        confirmColor: '#EB4A42'
      })
    },
  }
})