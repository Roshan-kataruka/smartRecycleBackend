const admin = require('firebase-admin');

module.exports = {
  sendToTopic: (topic, title, body, image) => {
    const message = {
      notification: {
        title,
        body,
        image,
      },
      topic,
      android: {
        priority: 'high',
        ttl: 0,
      },
    };

    return admin.messaging().send(message);
  },
};

