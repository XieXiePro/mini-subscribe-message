const cloud = require('wx-server-sdk');

exports.main = async (event, context) => {
  cloud.init();
  const db = cloud.database();

  try {
    // 从云开数据库中查询等待发送的消息列表
    const messages = await db
      .collection('notices')
      .get();

    // 循环消息列表
    const sendPromises = messages.data.map(async message => {
      try {
        // 发送订阅消息
        await cloud.openapi.subscribeMessage.send({
          openid: message.openid,
          thing2: message.thing2,
          time1: message.time1,
        });
        // 发送成功后将消息的状态改为已发送
        return db
          .collection('notices')
          .doc(message._id)
      } catch (e) {
        return e;
      }
    });

    return Promise.all(sendPromises);
  } catch (err) {
    console.log(err);
    return err;
  }
};
