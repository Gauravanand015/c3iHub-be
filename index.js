const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const { connection } = require("./config/db");
require("dotenv").config();
const path = require("path");
const multer = require("multer");
const { productRoute } = require("./routes/products");
const { userRouter } = require("./routes/user");
const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use("/assets", express.static(path.join(__dirname, "public")));

const uploader = multer({
  storage: multer.diskStorage({}),
  limits: { fileSize: 500000 },
});

app.get("/", (req, res) => {
  res.send("c3iHub-Assignment");
});

app.use("/", uploader.single("image"), productRoute);
app.use("/user", userRouter);

app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log(
      `Listening on Port ${process.env.PORT}` +
        `\n` +
        "Connected to the Mongo Database"
    );
  } catch (error) {
    console.error({
      message: "Error while connecting to server",
      ERROR: error.message,
    });
  }
});
