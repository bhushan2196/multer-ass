const express = require("express");
const path = require("path");
const cloudinary = require("cloudinary");
const app = express();

const multer = require("multer");
const upload = multer({ dest: "uploads/" });

// app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
  // res.send("hoem");
});
app.post("/upload", upload.single("avatar"), (req, res, next) => {
  //   res.send(req.file);
  //   next();

  (async function () {
    // Configuration
    cloudinary.config({
      cloud_name: "drxjuqbyy",
      api_key: "921364557958522",
      api_secret: "aCV4LyJDtOKOkVrBM7K23IQ-IqQ", // Click 'View Credentials' below to copy your API secret
    });

    // Upload an image
    const uploadResult = await cloudinary.uploader
      .upload(`${req.file.path}`, {
        public_id: `${req.file.filename}`,
      })
      .catch((error) => {
        console.log(error);
      });

    console.log(autoCropUrl);
    res.json({
      message: "file uploaded successfully",
      imageUrl: `${uploadResult.url}`,
    });
  })();
});

app.listen(3000, () => {
  console.log("server started");
});
