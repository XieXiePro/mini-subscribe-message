//index.js
//获取应用实例
const app = getApp()
const db = wx.cloud.database()
const templateId = 'FQAiSMdR5xibmnWL7zzIK26Px7vnHFY-40Oemx2rbOQ'; // 订阅消息模版id
Page({
  data: {

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
            //用户同意了订阅
            wx.showToast({
              title: '订阅成功'
            })
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
  }
})
