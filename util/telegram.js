require("dotenv").config();
const axios = require("axios");
const { TELEGRAM_TOKEN } = process.env;
const { GENERAL_ERROR_CHANNEL_ID } = process.env;

module.exports = {
  async send(channelId, text) {
    const url = `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage?chat_id=${channelId}&&text=${text}&disable_web_page_preview=true`;
    try {
      const response = await axios.get(url, { timeout: 10000 });
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
