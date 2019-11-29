// miniprogram/pages/pay/pay.js
Page({

  /**
   * 页面的初始数据
   */
    data: {
      args: {
        fee: 1,             // 支付金额，单位为分
        paymentArgs: 'A', // 将传递到功能页函数的自定义参数
        currencyType: 'USD' // 货币符号，页面显示货币简写 US$ 
    }
    },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
    // 用户支付
    requestPayment: function () {
      wx.requestPayment({
          'timeStamp': '',
          'nonceStr': '',
          'package': '',
          'signType': 'MD5',
          'paySign': '',
        'success': function (res) {
          console.log(res);
        },
        'fail': function (res) {
          console.log('fail:' + JSON.stringify(res));
        },
        'complete': function (res) { 
          //调用订阅消息
          wx.requestSubscribeMessage({
            tmplIds: ['FQAiSMdR5xibmnWL7zzIK26Px7vnHFY-40Oemx2rbOQ'],
            success(res) { }
          })
        }
      })
    }
})