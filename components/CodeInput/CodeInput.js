// components/CodeInput/CodeInput.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title: {
      type: String,
    },
    tips: {
      type: String,
    },
    length:{
      type:Number,
      value:-1,
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
    onInput(e) {
      this.triggerEvent('Input', e.detail.value)
      
    }
  }
})