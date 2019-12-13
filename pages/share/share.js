// pages/qrcode/qrcode.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo: null,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    imgUrl: null,
    saveImgUrl: null,
    setting: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (option) {
    const that = this
    console.log(option)
    that.setData({
      nickName: app.globalData.nickName,
      avatarUrl: app.globalData.avatarUrl
    })
    that.getimgurl()
    that.nav = this.selectComponent("#navindex")
    // that.nav.changetype()
  },
  getimgurl() {
    const that = this
    wx.request({
       url: app.globalData.url + "/create/codeimg",
       method: 'post',
       data:{
        session:app.globalData.session,
         userId: app.globalData.userId,
       },
       success(res){
        console.log(res)
        let imgsrc = res.data.imgsrc
         console.log(imgsrc)
          that.setData({
            getimgurl: `${app.globalData.url}${imgsrc}`,
            saveimgurl: `${app.globalData.url}${imgsrc}`
          })
         console.log(that.data.getimgurl)
         console.log(that.data.saveimgurl)
       },
       fail(){

       }
     })
    
  },

  //保存二维码
  saveCode() {
    console.log('downloadFile url:', this.data.saveImgUrl);
    wx.downloadFile({
      url: this.data.saveimgurl, //这个是保存后的二维码
      success(res) {
        console.log('downloadFile success:', res);
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success(res) {
            wx.showToast({
              title: '已保存',
              duration: 1500,
              mask: true
            })
          },
          fail(error) {
            console.log('save to album error:', error)
            wx.showToast({
              title: '保存失败，您还可以截图保存二维码',
              duration: 1500,
              mask: true,
              icon: 'none'
            })
          }
        })
      }
    })
  },
  handSetting: function (e) {
    console.log(e)
    let that = this
    if (!e.detail.authSetting['scope.writePhotosAlbum']) {
      that.setData({
        setting: true
      })
      wx.showToast({
        title: '保存失败，您还可以截图保存二维码',
        duration: 1500,
        mask: true,
        icon: 'none'
      })
    } else {
      that.setData({
        setting: false
      })
      that.saveCode()
    }

  },

  //授权窗口失败后，需要手动调取授权设置
  handleSetting: function () {
    let that = this
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.writePhotosAlbum']) {
          that.saveCode()
        } else {
          wx.authorize({
            scope: 'scope.writePhotosAlbum',
            success() {
              console.log('success')
              that.saveCode()
            },
            fail() {
              that.setData({
                setting: true
              })
              wx.showToast({
                title: '保存失败，您还可以截图保存二维码',
                duration: 1500,
                mask: true,
                icon: 'none'
              })
            }
          })
        }
      }
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  }
})