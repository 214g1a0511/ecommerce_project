const imgbbUploader = require("imgbb-uploader");
require("dotenv").config();

const imageUpload = async (base64Image) => {
  try {
    const response = await imgbbUploader({
      apiKey: process.env.API_KEY,
      base64string: base64Image,
    });
    const res = await response.url;
    return res
  } catch (error) {
    console.log(error);
  }
};

module.exports = { imageUpload };