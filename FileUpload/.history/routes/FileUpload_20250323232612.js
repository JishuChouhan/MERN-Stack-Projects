const express = require('express');
const router = express.Router();

const {localFileUpload} = require("../controllers/fileUpload");

// api routes
// router.post("/imageUpload", imageUpload);

// router.post("/videoUpload", videupload);

// router.post("/imageReducerUpload", imageReducerUpload);

router.post("/localFileUpload", localFileUpload);

module.exports = router;