// pages/money/money.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    balance:50
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     const that = this 
     that.setData({
       balance: app.globalData.totalmoney
     })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
  goTopassword(){
   wx.navigateTo({
     url: '../password/password',
   })

},
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})