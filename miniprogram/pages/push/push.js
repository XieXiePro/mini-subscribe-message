// pages/push/push.js
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    users: [],
    date: '2019-11-29',
    textareaValue: '测试',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getAllUsers();
  },
  //进入页面开始查询接受订阅的用户
  getAllUsers: function () {
    let that = this;
    wx.showLoading({
      title: '数据加载中',
    }),
      db.collection('notices').get({
        success(res) {
          console.log(res.data);
          that.setData({
            users: res.data
          }, () => {
            wx.hideLoading();
          })
        },
        fail(res) {
          console.log("请求失败", res);
        }
      })
  },
  //点击事件
  sendMessageByClick: function () {
    let {
      date,
      textareaValue,
      users
    } = this.data;
    for (let i of users) {
      this.sendMessageByCloud(i._openid, textareaValue, date)
    }
  },
  //发送订阅消息
  sendMessageByCloud: function (id, text, date) {
    let that = this;
    wx.showLoading({
      title: '发送消息中',
    })
    wx.cloud.callFunction({
      name: 'sendMessage', // 上一篇文章中给到的云函数
      data: {
        openid: id, // 订阅消息模版参数,不同的模版参数不同
        thing2: text, // 订阅消息模版参数,不同的模版参数不同
        time1: date // 订阅消息模版参数,不同的模版参数不同
      },
      complete: res => {
        console.log(res);
        wx.hideLoading();
      }
    })
  }
})