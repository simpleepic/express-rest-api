const mongoose = require("mongoose");
const colors = require("colors");
const dotenv = require("dotenv");
const fs = require("fs");
const path = require("path");

dotenv.config({ path: "../config.env" });

const Post = require("../src/models/postModel");

const SAMPLE_POSTS = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, "./data/posts.json"))
);

// Database Connection
mongoose.set("strictQuery", false);
mongoose
  .connect(
    process.env.NODE_ENV === "development"
      ? process.env.DATABASE_LOCAL
      : process.env.DATABASE_CLOUD,
    { useNewUrlParser: true }
  )
  .then(() => console.log(colors.green("Database is connected for testing")));

const importData = async () => {
  try {
    await Post.create(SAMPLE_POSTS);
    console.log("Data imported");
  } catch (error) {
    console.log(error);
  }
};

const deleteData = async () => {
  try {
    await Post.deleteMany();
    console.log("Data deleted");
  } catch (error) {
    console.log(error);
  }
};

console.log(process.argv[2]);

if (process.argv[2] === "import") {
  importData();
} else if (process.argv[2] === "delete") {
  deleteData();
}
