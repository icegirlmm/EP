//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    // userInfo: {},
    // hasUserInfo: false,
    // canIUse: wx.canIUse('button.open-type.getUserInfo')
    imgUrls: [
      '../../images/1.jpg',
      '../../images/2.jpg',
      '../../images/3.jpg',
      '../../images/4.jpg'
    ],
    duration: 1000
  },
  //事件处理函数
  onLoad: function () {
    const that = this
    app.getSession().then(
      data => {
      let hasAuthorize = app.globalData.hasAuthorize
      console.log("hasAuthorize---------" + hasAuthorize)
      if (!hasAuthorize) {
        wx.redirectTo({
          url: '../authorize/authorize',
        })
      }
    }
    )
  },
  getToMap(){
    wx.navigateTo({
      url: '../map/map',
    })
  },
  onShareAppMessage: function () {
  }
})
