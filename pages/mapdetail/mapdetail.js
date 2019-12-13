// pages/mapdetail/mapdetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    addresslist:[],
    show:true
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
  handleValue(e){
    const that = this
    let value;
    if (e.detail.value != ''){
      value = e.detail.value
    }
    wx.request({
      url: `https://apis.map.qq.com/ws/place/v1/suggestion/?keyword=${value}&get_subpois=1&key=OD5BZ-T4U64-XVQUO-XKQHC-3VZGT-4UFBE`,
      method: 'GET',
      success(res){
        console.log(res.data.data)
        if (res.data.data == undefined || res.data.data.length == 0){
          return
        }
        if (res.data.data.length != 0){
          that.setData({
            addresslist: res.data.data,
            show: false
          })
        }
        if (that.data.addresslist.length == 0){
          that.setData({
            show: true
          })
        }
      },
      fail(){

      }
    })
  },
  goTomap(e){
    console.log(e.currentTarget.dataset)
    let lat = e.currentTarget.dataset.lat
    let lng = e.currentTarget.dataset.lng
    wx.redirectTo({
      url: `../map/map?lat=${lat}&lng=${lng}`,
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