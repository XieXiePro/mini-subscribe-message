import subscribe from '../../utils/SubscribeMessageUtil'

const app = getApp()

Page({
  data: {

  },
  //点击订阅代码
  subscriptionNotice: function () {
    const that = this
    subscribe.subscription('JRyK7rpbY7bzUn_REvgP2I6ZGV7c0HojMW64gmv2Yb4')
  }
})  