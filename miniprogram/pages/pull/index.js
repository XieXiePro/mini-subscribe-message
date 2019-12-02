import subscribe from '../../utils/SubscribeMessageUtil'

Page({
  data: {

  },
  //点击订阅代码
  subscriptionNotice: function () {
    subscribe.subscription(['JRyK7rpbY7bzUn_REvgP2I6ZGV7c0HojMW64gmv2Yb4',
      'kQ3j1dYlS3on7X1X_hfZGsQWx4boY5HiIKsnqrcgUUw',
      'NxuqffSJDeu9WuiYQdwPdlLfbiajOn_kf8zeu7xpJAU'])
  }
})  