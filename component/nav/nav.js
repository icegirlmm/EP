// component/nav/nav.js
const app = getApp()
Component({
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  /**
   * 组件的属性列表
   */
  properties: {
    title: {
      type: String,
      value: '易共享停车位'
    },
    navH: {
      type: Number,
      value: app.globalData.navHeight
    },
    bgcolor: {
      type: String,
      value: ''
    },
    img: {
      type: String,
      value: '../../images/backbtn.png'
    },
    imagewidth: {
      type: Number,
      value: 40
    },
    fun: {
      type: String,
      value: 'navBack'
    }
  },
  data: {
    titleshow: true,
    backshow: true
  },

  methods: {
    hidetitle() {
      this.setData({
        titleshow: !this.data.titleshow
      })
    },
    hideback() {
      this.setData({
        backshow: !this.data.backshow
      })
    },
    changetype() {
      this.setData({
        img: '../../images/backindex.png',
        imagewidth: 92,
        fun: 'navBackindex'
      })
    },
    changeRouter() {
      this.setData({
        fun: 'navBackindex'
      })
    },
    navBack() {
      wx.navigateBack(
        {
          delta: 1
        }
      )
    },
    navBackindex() {
      wx.redirectTo({
        url: '../index/index'
      })
    },
    navBackToMap(){
      wx.redirectTo({
        url: '../map/map'
      })
    }
  }
})
