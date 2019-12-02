//订阅消息工具模块
const subscribe = {

  subscription: function (mytmplIds) {
  if (wx.requestSubscribeMessage) {
    wx.requestSubscribeMessage({
      tmplIds: mytmplIds,
      // tmplIds: ['JRyK7rpbY7bzUn_REvgP2I6ZGV7c0HojMW64gmv2Yb4',
      //   'kQ3j1dYlS3on7X1X_hfZGsQWx4boY5HiIKsnqrcgUUw',
      //   'NxuqffSJDeu9WuiYQdwPdlLfbiajOn_kf8zeu7xpJAU',
      //   'FQAiSMdR5xibmnWL7zzIK26Px7vnHFY-40Oemx2rbOQ'],
      success(res) {
        //此处处理多个订阅消息逻辑
        // if (res[templateId] == 'accept') {
        //   //用户同意了订阅
        //   wx.showToast({
        //     title: '订阅成功'
        //   })
        // } else {
        //   //用户拒绝了订阅或当前游戏被禁用订阅消息
        //   wx.showToast({
        //     title: '订阅失败'
        //   })
        // }
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
}
export default subscribe