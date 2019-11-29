&emsp;&emsp;这是一份小程序消息订阅快速开发指引，其中演示了如何快速上手消息订阅的订阅、推送、支付订阅功能。

&emsp;&emsp;根据[官方指南](https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/subscribe-message.html)，小程序订阅消息功能接入一共分为三个步骤。

### 第一步：获取模板 ID

&emsp;&emsp;在微信公众平台手动配置获取模板 ID：

&emsp;&emsp;登录 [https://mp.weixin.qq.com](https://mp.weixin.qq.com) 获取模板，如果没有合适的模板，可以申请添加新模板，审核通过后可使用。

![获取模板ID](https://upload-images.jianshu.io/upload_images/2783386-6756e5cf14d9f5b8.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

### [](https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/subscribe-message.html#步骤二：获取下发权限)第二步：获取下发权限

```
const templateId = 'FQAiSMdR5xibmnWL7zzIK26Px7vnHFY-40Oemx2rbOQ'; // 订阅消息模版id

wx.requestSubscribeMessage({
        tmplIds: [templateId],
        success(res) {
          if (res[templateId] == 'accept') {
            //用户同意了订阅，允许订阅消息
            wx.showToast({
              title: '订阅成功'
            })
          } else {
            //用户拒绝了订阅，禁用订阅消息
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
```

&emsp;&emsp;详见小程序端消息订阅接口 [wx.requestSubscribeMessage](https://developers.weixin.qq.com/miniprogram/dev/api/open-api/subscribe-message/wx.requestSubscribeMessage.html)

### [](https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/subscribe-message.html#步骤三：调用接口下发订阅消息)第三步：调用接口下发订阅消息

&emsp;&emsp;详见服务端消息发送接口 [subscribeMessage.send](https://developers.weixin.qq.com/miniprogram/dev/api-backend/open-api/subscribe-message/subscribeMessage.send.html)

```
        // 发送订阅消息
        cloud.openapi.subscribeMessage.send({
          openid: message.openid,
          thing2: message.thing2,
          time1: message.time1,
        });
```

### 小结：

&emsp;&emsp;1、调用订阅消息需在tab绑定事件（或支付）中调用，否则不允许调用；

&emsp;&emsp;2、如果只需要小程序端允许接收订阅消息，而不需要在小程序端发起推送订阅消息，则不需要第三步；

&emsp;&emsp;3、调用接口下发订阅消息有HTTPS 调用何云调用两种方式，如使用 [HTTPS 调用](https://developers.weixin.qq.com/miniprogram/dev/api-backend/open-api/subscribe-message/subscribeMessage.send.html#请求地址)，则不用使用云调用方式；

### 完整代码见GitHab：[小程序消息订阅](https://github.com/XieXiePro/mini-subscribe-message)

###### 本代码中存在的问题：

&emsp;&emsp;1、使用小程序发起推送订阅消息不成功；

&emsp;&emsp;2、使用个人账号无法使用微信支付功能，未验证支付成功后是否能调用订阅消息；


###### &emsp;&emsp;关于消息订阅内容介绍，请查看后续文章。

### 参考资料：

&emsp;&emsp;[1、微信小程序订阅消息开发之云开发 ](https://github.com/it5200/wxsms)

&emsp;&emsp;[2、云开发快速接入小程序订阅消息，开发开课提醒小程序 ](https://github.com/binggg/tcb-subscribe-demo)