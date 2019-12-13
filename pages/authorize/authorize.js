// pages/authorize/authorize.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this
    this.nav = this.selectComponent("#nav");
    this.nav.changeRouter()
    console.log(app.globalData.hasAuthorize)
    app.getSession()
  },
  authorFunc(e){
    const that = this
    console.log(e)
    if (e.detail.userInfo) {
      app.globalData.hasAuthorize = true
      let userInfo = {
        nickName: e.detail.userInfo.nickName,
        avatarUrl: e.detail.userInfo.avatarUrl,
        gender: e.detail.userInfo.gender,
        city: e.detail.userInfo.city,
        province: e.detail.userInfo.province,
        country: e.detail.userInfo.country,
        language: e.detail.userInfo.language
      }
      wx.request({
        url: `${app.globalData.url}/users/addUserInfo`,
        method: 'POST',
        data: JSON.stringify({
          userId: app.globalData.userId,
          userInfo: userInfo
        }),
        success(res) {
          console.log(res)
           app.getSession(true).then(
             data=>{
               wx.redirectTo({
                 url: '../index/index',
               })
             }
           )
           
        },
        fail(){

        }
      })
    
    }
    console.log(app.globalData.hasAuthorize)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    //  wx.request({
    //    url: 'https://:3000/users/getUserInfo?id=1',
    //    method: 'get',
    //    success(res){
    //     console.log(res)
    //    },
    //    fail(){

    //    }
    //  })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

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