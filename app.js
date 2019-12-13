//app.js
let session = null
App({
  onLaunch: function (options) {
    const that = this
   
      const deviceInfo = wx.getStorageSync("deviceInfo");
      if (!deviceInfo) {
        const res = wx.getSystemInfoSync()
        this.globalData.windowHeight = res.windowHeight;
        this.globalData.windowWidth = res.windowWidth;
        wx.setStorageSync("deviceInfo", {
          windowHeight: res.windowHeight,
          windowWidth: res.windowWidth
        })
      } else {
        this.globalData.windowHeight = deviceInfo.windowHeight;
        this.globalData.windowWidth = deviceInfo.windowWidth;
      }
       // console.log(options)
    // 获取手机状态栏高度
    wx.getSystemInfo({
      success: res => {
        //导航高度
        console.log(res)
        that.globalData.navHeight = res.statusBarHeight + 44;
        that.globalData.BarHeight = res.statusBarHeight;
      },
      fail(err) {
        console.log(err);
      }
    })
    
    that.changeurl();
  },
  getSession(flag) {
    const that = this
    if (session && !flag) {
      wx.setStorageSync('globalData', session)
      return Promise.resolve(session)
    } else {
      return new Promise((resolve, reject) => {
        wx.login({
          success: (login) => {
            // 发送 res.code 到后台换取 openId, sessionKey, unionId
            console.log('wx.login:', login);
            wx.request({
              url: `${that.globalData.url}/users/login`,
              method: 'POST',
              data: JSON.stringify({
                wxcode: login.code
              }),
              header: {
                'content-type': 'application/json' // 默认值
              }, 
              success(res) {
                console.log(res)
                that.globalData.session = res.data.session
                that.globalData.userId = res.data.userId
                console.log("res.data.totalmoney",res.data.totalmoney)
                that.globalData.totalmoney = res.data.totalmoney
                that.globalData.nickName = res.data.userInfo.nickName
                that.globalData.avatarUrl = res.data.userInfo.avatarUrl
                let nickName = res.data.userInfo.nickName
                let avatarUrl = res.data.userInfo.avatarUrl
                if (nickName && avatarUrl) {
                  that.globalData.hasAuthorize = true
                } else {
                  that.globalData.hasAuthorize= false
                }
                console.log(that.globalData)
                session = that.globalData
                resolve(that.globalData)
                wx.setStorage({
                  key: 'globalData',
                  data: session,
                })
      
              },
              fail(err) {
                console.log('TokenErr', err)
                reject('TokenErr')
              }
            })
          }
        })
      })
    }
  },
  //不同环境
  changeurl() {
    let that = this
    //1是测试，2是线上
    let config = 2
    if (config == 1) {
      that.globalData.url = 'http://127.0.0.1:3000'
    } else if (config == 2) {
      that.globalData.url = 'https://www.easypark.top'
      // that.globalData.url = 'http://39.106.212.83:3000'
    }
    console.log(that.globalData.url)
  },
  globalData: {
    distinct: "longxiaozhai_cource",
    session: null,
    userId: null,
    hasAuthorize: false, //授权状态
    url: '' //默认线上环境
  }
})