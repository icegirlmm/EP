// pages/material/material.js
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
    const that = this
    that.getuseinfo()
  },
  getuseinfo:function(){
    const that = this
    let userId = app.globalData.userId
    wx.request({
      url: `${app.globalData.url}/users/display`,
      method: 'POST',
      data: JSON.stringify({
        userId: userId
      }),
      success(res){
        console.log(res)
        if (res.data.nickName == null){   
          that.setData({
            nickName: ''
          })
        } else{
          that.setData({
            nickName: res.data.nickName
          })
        }
        if (res.data.telphone == null){
          that.setData({
            telphone: ''
          })

        } else {
          that.setData({
            telphone: res.data.telphone
          })
        }
        if (res.data.plate == null){
          that.setData({
            plate: '',
          })
        } else {
          that.setData({
            plate: res.data.plate
          })

        }
      },
      fail(){

      }
    })

  },
  handleRevise:function(){
    wx.navigateTo({
      url: '../revisematerial/revisematerial',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
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