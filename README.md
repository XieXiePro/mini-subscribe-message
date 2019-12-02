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

####下面演示 [HTTPS 调用](https://developers.weixin.qq.com/miniprogram/dev/api-backend/open-api/subscribe-message/subscribeMessage.send.html#请求地址)，使用接口模拟服务端推送订阅消息。

&emsp;&emsp;Step 1：使用appid和secret生成[access_token](https://developers.weixin.qq.com/miniprogram/dev/framework/server-ability/backend-api.html#access_token)，使用Get请求：https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=xxx&secret=xxx，返回结果如下：

![access_token](https://upload-images.jianshu.io/upload_images/2783386-15a6db40241ecd49.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

&emsp;&emsp;Step 2：使用上面获取到的access_token，发起Post请求测试推送：https://api.weixin.qq.com/cgi-bin/message/subscribe/send?access_token=（access_token），请求和返回结果如下：

![推送订阅消息参数](https://upload-images.jianshu.io/upload_images/2783386-5187736780988885.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

&emsp;&emsp;订阅推送消息报错43101，表示该小程序用户未允许接收订阅消息，若订阅消息成功则返回结果如下：

![推送订阅消息成功返回结果](https://upload-images.jianshu.io/upload_images/2783386-5cd6e07885095176.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

&emsp;&emsp;Step 3：打开微信，在服务通知中查看小程序订阅消息：
![接收到的订阅消息](https://upload-images.jianshu.io/upload_images/2783386-a3088b733f924fc0.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

&emsp;&emsp;详见服务端消息发送接口 [subscribeMessage.send](https://developers.weixin.qq.com/miniprogram/dev/api-backend/open-api/subscribe-message/subscribeMessage.send.html)

### 小结：

&emsp;&emsp;1、调用订阅消息需在tab绑定事件（或支付）中调用，否则不允许调用；
![不允许调用订阅消息方法](https://upload-images.jianshu.io/upload_images/2783386-fc43496266e8f10e.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

&emsp;&emsp;2、如果只需要小程序端允许接收订阅消息，而不需要在小程序端发起推送订阅消息，则不需要小程序端执行第三步，可由服务端发起推送；

&emsp;&emsp;3、调用接口下发订阅消息有HTTPS 调用和云调用两种方式，如使用 [HTTPS 调用](https://developers.weixin.qq.com/miniprogram/dev/api-backend/open-api/subscribe-message/subscribeMessage.send.html#请求地址)，则不用使用云调用方式；

### 完整代码见GitHab：[小程序消息订阅](https://github.com/XieXiePro/mini-subscribe-message)

###### 本代码中存在的问题：

&emsp;&emsp;1、使用个人账号无法使用微信支付功能，未验证支付成功后是否能调用订阅消息。


###### &emsp;&emsp;关于消息订阅内容介绍，请看[关于小程序订阅消息，看这篇就够了！](https://www.jianshu.com/p/b5c51f2e754e)。

### 参考资料：

&emsp;&emsp;[1、微信小程序订阅消息开发之云开发 ](https://github.com/it5200/wxsms)

&emsp;&emsp;[2、云开发快速接入小程序订阅消息，开发开课提醒小程序 ](https://github.com/binggg/tcb-subscribe-demo)