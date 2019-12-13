// pages/self/self.js
var app = getApp();
var utils = require("../../utils/util.js");
let markerId;
Page({
  /**
   * 页面的初始数据
   */
  data: {
    parkname: '',
    nickName: '',
    date: '',
    money: '',
    content: '',
    addressdetail: '',
    //日期
    timeList: [],
    //可预约天数
    yyDay: 30,
    //预约时间段
    hourList: [
    { hour: "00:00-6:00", n: 7, isShow: true }, 
    { hour: "8:00-9:00", n: 8, isShow: true },
    { hour: "9:00-10:00", n: 9, isShow: true },
    { hour: "10:00-11:00", n: 10, isShow: true },
    { hour: "11:00-12:00", n: 11, isShow: true },
    { hour: "12:00-13:00", n: 12, isShow: true },
    { hour: "13:00-14:00", n: 13, isShow: true },
    { hour: "14:00-15:00", n: 14, isShow: true },
    { hour: "15:00-16:00", n: 15, isShow: true },
    { hour: "16:00-17:00", n: 16, isShow: true },
    { hour: "17:00-18:00", n: 17, isShow: true },
    { hour: "18:00-19:00", n: 18, isShow: true },
    { hour: "19:00-20:00", n: 19, isShow: true },
    { hour: "20:00-21:00", n: 20, isShow: true },
    { hour: "21:00-22:00", n: 21, isShow: true },
    { hour: "22:00-23:00", n: 22, isShow: true },
    { hour: "23:00-24:00", n: 23, isShow: true }
    ],
    //是否显示
    timeShow: false,
    currentTab: 0,
    //选择时间
    chooseHour: "",
    //选择日期
    chooseTime: "",
    hourIndex: -1,
    //预约时间
    yyTime: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  getInfo(){
    const that = this
    console.log(markerId)
    wx.request({
      url: app.globalData.url + '/notice/getMarkList',
      method: 'POST',
      data:{
        markerId: markerId
      },
      success(res) {
        console.log(res)
        let data = res.data.returnValue[0]
        wx.setStorage({
          key: 'issueInfo',
          data: data,
        })
        that.setData({
          parkname :data.parkname,
          nickName: data.issuenickName,
          date: utils.formatDisplayTime(data.date),
          money: data.parkprice,
          content: data.parkdec,
          addressdetail:data.issueaddress,
          issueuserId: data.issueuserId,
          noticeId: data._id
        })
        console.log(that.data.issueuserId)
      },
      fail(){

      }
    })
  },
  order(){
    const that = this
    if(that.data.userId != that.data.issueuserId){
       wx.navigateTo({
         url: '../schedule/schedule?noticeId=' + that.data.noticeId,
       })
    }
    
  },






  //弹出按钮
  showTimeModel: function () {
    this.setData({
      timeShow: !this.data.timeShow,
      chooseTime: this.data.timeList[0].date,
    });
  },
  //点击外部取消
  modelCancel: function () {
    this.setData({
      timeShow: !this.data.timeShow,
      chooseTime: this.data.timeList[0].date,
    });
  },
  //日期选择
  timeClick: function (e) {
    //非今天-不判断超过当前时间点(所有时间点都可选择)
    if (e.currentTarget.dataset.index != 0) {
      var list = this.data.hourList;
      for (var i = 0; i < list.length; i++) {
        list[i].isShow = true;
      }
      this.setData({
        hourList: list
      })
    } else {
      //今天-过时不可预约
      var hour = new Date().getHours();
      for (var i = 0; i < this.data.hourList.length; i++) {
        var list = this.data.hourList;
        if (this.data.hourList[i].n <= hour) {
          list[i].isShow = false;
          this.setData({
            hourList: list
          })
        }
      }
    }
    this.setData({
      currentTab: e.currentTarget.dataset.index,
      chooseTime: this.data.timeList[e.currentTarget.dataset.index].date,
      yyTime: '',
      chooseHour: "",
      hourIndex: -1
    });
    console.log("this.data.chooseTime",this.data.chooseTime)
  },
  // 时间选择
  hourClick: function (e) {
    var that = this;
    // 时间不可选择
    if (!e.currentTarget.dataset.isshow) {
      return false;
    }
    this.setData({
      hourIndex: e.currentTarget.dataset.index,
      chooseHour: this.data.hourList[e.currentTarget.dataset.index].hour,

    });
    var chooseTime = new Date().getFullYear() + "-" + this.data.chooseTime + " " + this.data.chooseHour
    this.setData({
      yyTime: chooseTime
    })
    console.log(chooseTime)
    wx.setStorage({
      key: 'chooseTime',
      data: chooseTime,
    })
  },
  onLoad: function (options) {
    const that = this
    console.log(options.markerId)
    markerId = options.markerId
    this.setData({
      userId: app.globalData.userId
    });
    that.getInfo()


    Date.prototype.Format = function (format) {
      var o = {
        "M+": this.getMonth() + 1,  //month
        "d+": this.getDate(),     //day
        "h+": this.getHours(),    //hour
        "m+": this.getMinutes(),  //minute
        "s+": this.getSeconds(), //second
        "q+": Math.floor((this.getMonth() + 3) / 3),  //quarter
        "S": this.getMilliseconds() //millisecond
      }
      if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
      }
      for (var k in o) {
        if (new RegExp("(" + k + ")").test(format)) {
          format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
        }
      }
      return format;
    }
    Date.prototype.DateAdd = function (interval, number) {
      number = parseInt(number);
      var date = new Date(this.getTime());
      switch (interval) {
        case "y": date.setFullYear(this.getFullYear() + number); break;
        case "m": date.setMonth(this.getMonth() + number); break;
        case "d": date.setDate(this.getDate() + number); break;
        case "w": date.setDate(this.getDate() + 7 * number); break;
        case "h": date.setHours(this.getHours() + number); break;
        case "n": date.setMinutes(this.getMinutes() + number); break;
        case "s": date.setSeconds(this.getSeconds() + number); break;
        case "l": date.setMilliseconds(this.getMilliseconds() + number); break;
      }
      return date;
    }



    var dateList = [];
    var now = new Date();
    for (var i = 0; i < this.data.yyDay; i++) {
      var d = {};
      var day = new Date().DateAdd('d', i).getDay();
      if (day == 1) { var w = "周一" }
      if (day == 2) { var w = "周二" }
      if (day == 3) { var w = "周三" }
      if (day == 4) { var w = "周四" }
      if (day == 5) { var w = "周五" }
      if (day == 6) { var w = "周六" }
      if (day == 0) { var w = "周日" }
      d.name = w;
      d.date = new Date().DateAdd('d', i).Format("MM-dd");
      dateList.push(d)
    }
    this.setData({
      timeList: dateList
    });
    //初始化判断
    //当前时间
    var hour = new Date().getHours();

    for (var i = 0; i < this.data.hourList.length; i++) {
      var list = this.data.hourList;
      //过时不可选
      if (this.data.hourList[i].n <= hour) {
        list[i].isShow = false;
        this.setData({
          hourList: list
        })
      }
    }
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