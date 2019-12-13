var app = getApp();
var util = require("../../utils/util.js");
Page({
  data: {
    userInfo: {},
    userId: '',
    hasMsg: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
      this.setData({
        avatarUrl: app.globalData.avatarUrl,
        nickName: app.globalData.nickName
      });
      if (app.globalData.userId) {
        this.setData({
          userId: app.globalData.userId
        });
        //  this.haveNotRead();
      } else {
       
      }
  },
  onShow: function () {
    // this.haveNotRead();
  },
  haveNotRead: function () {
    let that = this;
    wx.request({
      url: app.globalData.httpHost + '/message/haveNotRead',
      method: 'POST',
      data: {
        userId: that.data.userId,
      },
      success: function (res) {
        if (res.data.code == 0) {
          that.setData({
            hasMsg: true
          });
        }
        else if (res.data.code == 2) {
          that.setData({
            hasMsg: false
          });
        }
      }
    })
  },
  // 弹出框
  showModal: function (e) {
    this.setData({
      showModal: true
    })

  },

  /**
   * 弹出框蒙层截断touchmove事件
   */
  preventTouchMove: function () { },
  /**
   * 隐藏模态对话框
   */
  hideModal: function () {
    this.setData({
      showModal: false
    });
  },
  /**
   * 对话框取消按钮点击事件
   */
  onCancel: function () {
    this.hideModal();
  },
  /**
   * 对话框确认按钮点击事件
   */
  goPublishList: function () {
    wx.navigateTo({
      url: '../publishList/publishList',
    });
  },
  goMyOrder: function () {
    wx.navigateTo({
      url: '../order/order',
    });
  },
  goMyReceive: function () {
    wx.navigateTo({
      url: '../myReceive/myReceive',
    });
  },
  goMsgList: function () {
    wx.navigateTo({
      url: '../msgList/msgList',
    })
  },
  goFeedBack: function () {
    wx.navigateTo({
      url: '../feedback/feedback',
    })
  }
})