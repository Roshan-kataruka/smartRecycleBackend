const admin = require('firebase-admin');
const serviceAccount = require('./android_imp.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const {sendToTopic} = require('./Notification.service');

module.exports = {
  sendMessage: async (req, res) => {
    try {
      const topic = "smartrecycle";
      const { title, body, image } = req.body;

      const result = await sendToTopic(topic, title, body, image);

      console.log(result)

      res.status(200).json({ status: 1, message: 'Message sent successfully' });
    } catch (error) {
      console.error('Error sending message:', error);
      res.status(500).json({ status: 0, message: "Message not sent" });
    }
  },
};

