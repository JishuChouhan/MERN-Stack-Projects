const express = require("express");
const app = express();

require('dotenv').config();
const PORT = process.env.PORT || 4000;

// Cookie-parsser - jwt.sign - jwt.verify - bcrypt.compare

app.use(express.json());

require("./config/database").connect();

//route import and mount
const user = require("./routes/user");
app.use("/api/v1", user);

// activate

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});