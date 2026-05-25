const { v2: cloudinary } = require("cloudinary")
require("dotenv").config();


cloudinary.config({
    cloud_name: process.env.PY_CLOUD_NAME,
    api_key: process.env.PY_API_KEY,
    api_secret: process.env.PY_API_SECRET
});

module.exports = cloudinary;