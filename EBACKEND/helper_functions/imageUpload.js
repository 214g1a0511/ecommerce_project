const imgbbUploader = require("imgbb-uploader");
require("dotenv").config();
// dotenv.config();

const imageUpload = async (base64Image) => {
  // console.log(base64Image)
  try {
    const response = await imgbbUploader({
      apiKey: process.env.API_KEY,
      base64string: base64Image,
    });
    const res = await response.url;
    // console.log(res);
    return res
  } catch (error) {
    console.log(error);
  }
};

module.exports = { imageUpload };