require("dotenv").config();
const axios = require("axios");
const {
  TELEGRAM_TOKEN,
  TELEGRAM_GROUP_ID,
  TELEGRAM_NOTIFICATION_ID,
  TELEGRAM_CRONJOB_ID,
  TELEGRAM_ERROR_ID,
} = process.env;
const { GENERAL_ERROR_CHANNEL_ID } = process.env;

module.exports = {
  async send(type, text) {
    const url = `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`;
    let topicId = "";

    if (type === "appNoti") {
      topicId = TELEGRAM_NOTIFICATION_ID;
    } else if (type === "cronjob") {
      topicId = TELEGRAM_CRONJOB_ID;
    } else if (type === "error") {
      topicId = TELEGRAM_ERROR_ID;
    }

    const payload = {
      message_thread_id: topicId,
      chat_id: TELEGRAM_GROUP_ID,
      text,
    };

    try {
      const response = await axios.post(url, payload);
      return response;
    } catch (error) {
      // If timeout error occurs, retry the request after a delay
      if (error.code === "ETIMEDOUT") {
        console.log("Connection timeout, retrying...");
        await new Promise((resolve) => setTimeout(resolve, 5000)); // Wait for 5 seconds before retrying
        return this.send(channelId, text); // Retry the request recursively
      } else {
        // If it's not a timeout error, handle it accordingly
        console.error("Error sending message:", error);
        throw error; // Re-throw the error for the caller to handle
      }
    }
  },

  async generalErrorChannel(text) {
    return this.send(GENERAL_ERROR_CHANNEL_ID, text);
  },
};
