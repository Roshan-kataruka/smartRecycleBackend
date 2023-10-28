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
      const { title, body} = req.body;

      image="https://firebasestorage.googleapis.com/v0/b/smartrecycle-7b736.appspot.com/o/applogo.jpeg?alt=media&token=20c3827a-8e97-4113-95c3-09fa52bc6ad2&_gl=1*1s0rk07*_ga*MTYwNjg1MDk2MC4xNjk0ODg4MzEx*_ga_CW55HF8NVT*MTY5ODQ5MTM3My4xNi4xLjE2OTg0OTIxMTguMjQuMC4w";
      
      const result = await sendToTopic(topic, title, body, image);

      //console.log(result)

      res.status(200).json({ status: 1, message: 'Message sent successfully' });
    } catch (error) {
      console.error('Error sending message:', error);
      res.status(500).json({ status: 0, message: "Message not sent" });
    }
  },
};

