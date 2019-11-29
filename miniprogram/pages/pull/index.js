//index.js
//获取应用实例
const app = getApp()
const db = wx.cloud.database()
let templateId = 'FQAiSMdR5xibmnWL7zzIK26Px7vnHFY-40Oemx2rbOQ'; // 订阅消息模版id
Page({
  data: {
    isAccept: false, 
    users: []
  },
  onLoad: function () {
    //试验是否可以调用订阅消息
    // wx.requestSubscribeMessage({
    //   tmplIds: ['FQAiSMdR5xibmnWL7zzIK26Px7vnHFY-40Oemx2rbOQ'],
    //   success(res) { }
    // })
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  //查询用户是否订阅（用来控制订阅提示的显示与隐藏）
  checkIsAccept: function (id) {
    let that = this;
    db.collection('notices').where({ _openid: id }).get({
      success(res) {
        if (res.data.length == 0) {
          that.setData({
            isAccept: true
          })
        }
      },
      fail(res) {
        console.log("请求失败", res);
      }
    })
  }, 
  //点击订阅代码
  subscriptionNotice: function () {
    wx.vibrateShort();
    let that = this;
    
    if (wx.requestSubscribeMessage) {
      wx.requestSubscribeMessage({
        tmplIds: [templateId],
        success(res) {
          if (res[templateId] == 'accept') {
            //用户同意了订阅，添加进数据库，用于上面的查询checkIsAccept()需要
            that.addAccept(that.data.openid)
          } else {
            //用户拒绝了订阅或当前游戏被禁用订阅消息
            wx.showToast({
              title: '订阅失败'
            })
          }
        },
        fail(res) {
          console.log(res)
        },
        complete(res) {
          console.log(res)
        }
      })
    } else {
      // 兼容处理
      wx.showModal({
        title: '提示',
        content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
      })
    }
  },
  // 用户点击订阅添加到数据库
  addAccept: function (_id) {
    db.collection('notices')
      .add({
        data: {
          id: _id,
          templateId: templateId,
          touser: _id
        }
      })
      .then((res) => {
        console.log('入notices库成功', res);
        this.setData({
          isAccept: true
        }, () => {
          wx.showToast({
            title: '订阅成功'
          })
        })
      })
  }
})
