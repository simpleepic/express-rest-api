const mongoose = require("mongoose");
const colors = require("colors");
const dotenv = require("dotenv");

// Uncaught excpetions handling
process.on("uncaughtException", (err) => {
  console.log("UNCAUGHT EXCEPTION: Server Shutting down");
  console.log(err.name, err.message);

  process.exit(1);
});

dotenv.config({ path: "./config.env" });

const app = require("./src/app");

// Database Connection
mongoose.set("strictQuery", false);
mongoose
  .connect(
    process.env.NODE_ENV === "development"
      ? process.env.DATABASE_LOCAL
      : process.env.DATABASE_CLOUD,
    { useNewUrlParser: true }
  )
  .then(() => console.log(colors.green("Database is connected")));

// Server running
const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(
    colors.green(
      `App is running on port ${PORT} as ${process.env.NODE_ENV} mode`
    )
  );
});

// Unhandled rejections handling
process.on("unhandledRejection", (err) => {
  console.log("UNCAUGHT REJECTION: Server Shutting down");
  console.log(err.name, err.message);

  server.close(() => process.exit(1));
});
