// pages/revisematerial/revisematerial.js
const app = getApp()

let resdata = {
  nickName:'',
  telphone:'',
  plate:''
};
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
  handleName:function(e){
    console.log(e.detail.value)
    resdata.nickName = e.detail.value
     
  },
  handletel: function (e) {
    console.log(e.detail.value)
    resdata.telphone = e.detail.value
  
  },
  handleplate: function (e) {
    console.log(e.detail.value)
    resdata.plate = e.detail.value
    
    
  },
  handleRevise(){
    console.log(resdata)
    if (resdata.nickName == ''){
      wx.showToast({
        title: '填写昵称',
        icon:'none'
      })
    } else if (resdata.telphone == ''){
      wx.showToast({
        title: '填写电话',
        icon: 'none'
      })
    } else if (resdata.plate == '') {
      wx.showToast({
        title: '填写车牌号',
        icon: 'none'
      })
    }else{
      wx.request({
        url: `${app.globalData.url}/users/updateUser`,
        method: 'post',
        data: JSON.stringify({
          userId: app.globalData.userId,
          nickName: resdata.nickName,
          telphone: resdata.telphone,
          plate: resdata.plate
        }),
        success(res) {
          console.log(res)
          wx.navigateTo({
            url: '../material/material',
          })  
        },
        fail(){

        }
      })
    }

  },



  

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})