// pages/map/map.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    circles:[{
      latitude: "",
      longitude: "",
      fillColor: '#ffffff00',
      color: '#2E8B57',
      radius: 200
    }],
    longitude:"",
    latitude:"",
    markers: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this
    this.nav = this.selectComponent("#nav");
    this.nav.changeRouter()
    console.log(options)
    if (options.lng && options.lat){
      that.setData({
        longitude: options.lng,
        latitude: options.lat
      })
      let latitude = 'circles[0].latitude'
      let longitude = 'circles[0].longitude'
      let marklatitude = 'markers[0].latitude'
      let marklongitude = 'markers[0].longitude'
      this.setData({
        [latitude]: options.lat,
        [longitude]: options.lng,
        [marklatitude]: options.lat,
        [marklongitude]: options.lng
      })
      console.log(that.data.circles)
    }else{
      that.handleGetSetting()
    }
    that.getissusedetail()
  },
  showSettingToast: function (e) {
    wx.showModal({
      title: '提示！',
      confirmText: '去设置',
      showCancel: false,
      content: e,
      success: function (res) {
        if (res.confirm) {
          wx.navigateTo({
            url: '../setting/setting',
          })
        }
      }
    })
  },
  handleGetSetting(){
    const that = this
    wx.getSetting({
      success(res) {
        console.log(res)
        if (!res.authSetting['scope.userLocation']) {
          wx.authorize({
            scope: 'scope.userLocation',
            success(res) {
              console.log("res",res)
              wx.showToast({
                title: '授权成功！',
                duration: 1500
              })
              console.log(res)
              that.getLocation()
            },
            fail() {
              that.showSettingToast('需要授权位置信息');
            }
          })
        } else {
          that.getLocation()
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.mapCtx = wx.createMapContext('map');
  },
  
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    const that = this

   
  },
  getissusedetail(){
    wx.request({
      url: `${app.globalData.url}/notice/getNoticeList`,
      method: 'POST',
      success: this.getissusedetailsucc.bind(this),
      fail() {

      }
    })
  },
isEmptyObject(obj){
    for(var key in obj){
        return false
     };
    return true
},
  getissusedetailsucc(res){
    const that = this
    let data = res.data.returnValue
    console.log(data)
    let isEmptyObject = that.isEmptyObject(data)
    if (!isEmptyObject){
      const markers = data.map((value, index) => {
        return {
          iconPath: "../../images/parkimg.png",
          id: value._id,
          latitude: value.issuelatitude,
          longitude: value.issuelongitude,
          title: value.parkname,
          width: 20,
          height: 20,
          label: value.parkname
        }
      });
      console.log(markers)
      this.setData({
        markers: markers
      })
    }
   
  },
  getLocation(){
    wx.getLocation({
      type: 'gcj02',
      altitude:true,
      success: this.handleGetLocationSucc.bind(this),
      fail(res){
          console.log(res)
      }
    })
  },
  handleGetLocationSucc(res){
    console.log(res)
    this.setData({
      latitude:res.latitude,
      longitude:res.longitude
    })
    let latitude = 'circles[0].latitude'
    let longitude = 'circles[0].longitude'
    let marklatitude = 'markers[0].latitude'
    let marklongitude = 'markers[0].longitude'
    this.setData({
      [latitude]: res.latitude,
      [longitude]: res.longitude,
      [marklatitude]: res.latitude,
      [marklongitude]: res.longitude
    })
    console.log(this.data.circles)
  },

  goToDetailMap(){
     const that = this
     wx.navigateTo({
       url: '../mapdetail/mapdetail',
       success: function(res) {},
       fail: function(res) {},
       complete: function(res) {},
     })
  },
  handleMarkerTap(res){
    console.log(res)
    let markerId = res.markerId
    wx.navigateTo({
      url: '../issuedetail/issuedetail?markerId=' + markerId ,
    })

  },
  gotoissue(){
    wx.redirectTo({
      url: '../issue/issue',
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