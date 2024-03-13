const app = require("./app");
const config = require("./app/config/config");
const mongoose = require("mongoose");

async function startSever() {
  try {
    await mongoose.connect(config.db.uri);

    console.log("Connneted to the database");

    const PORT = config.app.port;
    app.listen(PORT, () => {
      console.log(`Sever is running on port ${PORT}`);
    });
  } catch (error) {
    console.log("Cannot connneted to the database");
    process.exit();
  }
}
startSever();
