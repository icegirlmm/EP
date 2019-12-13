// pages/issue/issue.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hasaddress:false,
    address:null
  },
  staticData:{
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  handleAddressClick(){
    const that = this
    wx.chooseLocation({
      success: that.handleChooseLocationSucc.bind(this)
    })
  },
  handleChooseLocationSucc(res){
      console.log(res)
      this.setData({
        hasaddress: true,
        address: res.address
      })
      Object.assign(this.staticData,{
        issueaddress:res.address,
        issuelatitude: res.latitude,
        issuelongitude: res.longitude
      })
  },
  handleName(res){
    console.log(res.detail.value)
    this.staticData.parkname = res.detail.value
    
  },
  handleTel(res){
    console.log(res.detail.value)
    this.staticData.parktel = res.detail.value

  },
  handlePrice(res){
    console.log(res.detail.value)
    this.staticData.parkprice = res.detail.value
  },
  handleParkDescribe(res){
    this.staticData.parkdec = res.detail.value
  },
  handleRevise(){
    let address = this.data.address
    if (!address){
       wx.showToast({
         title: '请填写地址',
         icon:'none',
         duration:2000
       })
    } else if (!this.staticData.parkname){
      wx.showToast({
        title: '请填写车位名称',
        icon: 'none',
        duration: 2000
      })
    } else if (!this.staticData.parktel){
      wx.showToast({
        title: '请填写您的联系方式',
        icon: 'none',
        duration: 2000
      })
    } else if (!this.staticData.parkprice){
      wx.showToast({
        title: '请填写车位预定价格',
        icon: 'none',
        duration: 2000
      })
    } else{
       if(!this.staticData.parkdec) {
        this.staticData.parkdec = ''
      }
      this.staticData.issueuserId = app.globalData.userId,
      this.staticData.issuenickName = app.globalData.nickName
      this.staticData.issueavatarUrl = app.globalData.avatarUrl
      console.log(this.staticData)
     let staticData = this.staticData

      wx.request({
        url: `${app.globalData.url}/notice/saveRewardNotice`,
        method: 'POST',
        data: JSON.stringify({staticData}),
        success(res) {
          console.log(res)
          wx.showToast({
            title: '发布成功',
          })
          setTimeout(()=>{
            wx.redirectTo({
              url: '../map/map',
            })
          },1000)
        },
        fail(){

        }
      })
    }
  },
  // bindTimeChange(e) {
  //   console.log('picker发送选择改变，携带值为', e.detail.value)
  //   this.setData({
  //     time: e.detail.value
  //   })
  // },

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