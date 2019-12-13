// pages/schedule/schedule.js
const app = getApp()
var utils = require("../../utils/util.js");
let name;
let orderphone;
let ordercarnum;
let ordercarbrand;
let issueUserId;
let issueAvatarUrl;
let issueNickName;
let parkname;
let issuetel;
let noticeId;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    // ordermoney:'10',
    date: '2016-09-01',
    payment_mode: 2,//默认支付方式 微信支付 
    isFocus: false,//控制input 聚焦 
    // balance: 100,//余额 
    // actual_fee: 10,//待支付 
    wallets_password_flag: false,//密码输入遮罩 
  },
 
   

  bindDateChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
    
  },
  name(e){
    console.log(e.detail.value)
    name = e.detail.value
  },
  orderphone(e){
    console.log(e.detail.value)
    orderphone = e.detail.value
  },
  ordercarnum(e){
    console.log(e.detail.value)
    ordercarnum = e.detail.value
  },
  ordercarbrand(e){
    console.log(e.detail.value)
    ordercarbrand = e.detail.value
  },
  handleSureOrder(){
    const that = this
    if (that.data.name == ''){
      if (name == '' || name == undefined || that.data.name == '') {
        wx.showToast({
          title: '请输入姓名',
          icon: 'none'
        })
      }
    }
    else if (orderphone == '' || orderphone== undefined){
      wx.showToast({
        title: '请输入手机号',
        icon: 'none'
      })
    } else if (ordercarnum == '' || ordercarnum == undefined){
      wx.showToast({
        title: '请输入车牌号',
        icon: 'none'
      })
    } else if (ordercarbrand == '' || ordercarbrand == undefined){
      wx.showToast({
        title: '请输入品牌',
        icon: 'none'
      })
    }else{
      // wx.showModal({
      //   title: '是否确认订单',
      //   content: '',
      //   success(res) {
          
      //   },
      //   fail(res){}
      // })
      wx.request({
        url: app.globalData.url + '/create/searchpassword',
        method: 'POST',
        data: {
          userId: app.globalData.userId,
        },
        success(res) {
          console.log(res)
          if(res.data.password == false){
            wx.showModal({
              title: '请设置密码',
              content: '您还没有设置密码,密码支付请取消,无密支付请确定',
              success(res) {
                if (res.confirm) {
                  console.log('用户点击确定')
                  sureorder(that)
                  wx.redirectTo({
                    url: '../order/order',
                  })
                } else if (res.cancel) {
                  console.log('用户点击取消')
                  wx.redirectTo({
                    url: '../password/password',
                  })
                }
              }
            })
          }else{
             that.setData({
               wallets_password_flag: true
             })
          }
          
        },
        fali() {

        }
      })
    
    }

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const that = this
    console.log(options)
     noticeId = options.noticeId
     that.setData({
       name:app.globalData.nickName
     })
     console.log(that.data.name)
    wx.getStorage({
      key: 'chooseTime',
      success: function (res) {
       
        that.setData({
          date: res.data
        })
      }
    })
    wx.getStorage({
      key: 'issueInfo',
      success: function (res) {
        console.log(res.data)
        let data = res.data
        that.setData({
          ordermoney:data.parkprice
        })
        issueUserId = data.issueuserId;
        issueAvatarUrl = data.issueavatarUrl;
        issueNickName = data.issuenickName;
        parkname = data.parkname;
        issuetel = data.parktel;
      },
    })
  },
  // ----------密码------------
  set_wallets_password(e) {//获取钱包密码 
    this.setData({
      wallets_password: e.detail.value
    });
    console.log(e.detail.value)
    if (this.data.wallets_password.length == 6) {//密码长度6位时，自动验证钱包支付结果 
      wallet_pay(this)
    }
  },
  set_Focus() {//聚焦input 
    console.log('isFocus', this.data.isFocus)
    this.setData({
      isFocus: true
    })
  },
  set_notFocus() {//失去焦点 
    this.setData({
      isFocus: false
    })
  },
  close_wallets_password() {//关闭钱包输入密码遮罩 
    this.setData({
      isFocus: false,//失去焦点 
      wallets_password_flag: false,
    })
  },
  pay() {//去支付 
    pay(this)
  },
  modify_password() {
    console.log("忘记密码")
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

/*-----------------------------------------------*/
/*支付*/
function pay(_this) {
  let apikey = _this.data.apikey;
  let id = _this.data.id;
  let payment_mode = _this.data.payment_mode
  if (payment_mode == 1) {
    // 微信支付 
    // 微信自带密码输入框 
    console.log('微信支付')
  } else if (payment_mode == 2) {
    // 钱包支付 输入密码 
    console.log('钱包支付')
    _this.setData({
      wallets_password_flag: true,
      isFocus: true
    })
  }

}
// 钱包支付 
function wallet_pay(_this) {
  console.log('钱包支付请求函数')
  console.log(_this.data.wallets_password)
  let wallets_password = _this.data.wallets_password
  //验证服务器密码
  wx.request({
    url: app.globalData.url + '/create/surepassword',
    method: 'POST',
    data: {
       userId:app.globalData.userId,
       password: wallets_password
    },
    success(res) {
      console.log(res)
      if (res.data.surepassword == true){
        sureorder(_this)
      }else{
        wx.showModal({
          title: '密码错误请重新输入',
          content: '密码错误请重新输入',
        })
      }

    },
    fali() {

    }
  })

  _this.setData({
    wallets_password_flag: false,
    isFocus: false
  })

 

  /* 
  1.支付成功 
  2.支付失败：提示；清空密码；自动聚焦isFocus:true，拉起键盘再次输入 
  */
} 
function sureorder(_this){
  wx.request({
    url: app.globalData.url + '/order/saveOrder',
    method: 'POST',
    data: {
      orderUserId: app.globalData.userId,
      orderAvatarUrl: app.globalData.avatarUrl,
      orderNickName: name,
      orderphone: orderphone,
      ordercarnum: ordercarnum,
      ordercarbrand: ordercarbrand,
      rewardMoney: _this.data.ordermoney,
      issueUserId: issueUserId,
      issueAvatarUrl: issueAvatarUrl,
      issueNickName: issueNickName,
      parkName: parkname,
      issuetel: issuetel,
      noticeId: noticeId
    },
    success(res) {
      console.log(res)
      app.globalData.totalmoney = res.data.returnValue.totalmoney
      if(res.data.code == 1){
        wx.showToast({
          title: '余额不足请充值',
          icon: 'none',
          duration: 2000
        })
      } else if (res.data.code == 0)
      {
        wx.showToast({
          title: '预定成功',
          icon: 'success',
          duration: 2000
        })
        setTimeout(() => {
          wx.redirectTo({
            url: '../order/order',
          })
        }, 2000)
      }
     
      
    },
    fali() {

    }
  })
}