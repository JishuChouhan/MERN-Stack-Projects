const express = require("express");
const app = express();

require('.env').config();
const PORT = process.env.PORT || 4000;

app.use(express.json());

require("./config/database").connect();

//route import and mount
const user = require("./routes/user");
app.use("/api/v1", user);

// activate

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});