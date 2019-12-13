// pages/password/password.js
const app = getApp()
let valueone;
let valuetwo;
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
  set_password(res){
    let value = res.detail.value
      valueone = value
    
  },
  sure_password(res){
    let value = res.detail.value
    valuetwo = value

  },
  setPassword(){
    console.log(valueone)
    console.log(valuetwo)
    if (valueone == undefined && valuetwo == undefined)
    {
      wx.showToast({
        title: '请输入密码',
        icon: 'none'
      })
      return
    }
    var length = valueone.replace(/^d/g, "").length;
   
      if (valueone == valuetwo && valueone != undefined) {
        let password = valueone
        wx.request({
          url: `${app.globalData.url}/create/password`,
          method: 'POST',
          data: {
            userId: app.globalData.userId,
            password: password
          },
          success(res) {
            console.log(res)
            wx.showToast({
              title: '密码设置成功',
            })
          },
          fail() {

          }
        })
      } else if (valueone == undefined && valueone == '') {
        wx.showToast({
          title: '请输入密码',
          icon: 'none'
        })
      } else if (valuetwo == undefined && valuetwo == '') {
        wx.showToast({
          title: '请确认密码',
          icon: 'none'
        })
      } else if(length<6){
        wx.showToast({
          title: '请输入6位数字密码',
          icon: 'none'
        })
      }
      else{
        wx.showToast({
          title: '两次密码不一致',
          icon: 'none'
        })
      }
    
   

   
  },

  /*
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