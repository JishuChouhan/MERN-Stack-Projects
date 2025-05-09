const express = require('express');
const router = express.Router();

const {localFileUpload, imageUpload, videoUpload} = require("../controllers/fileUpload");

// api routes
// router.post("/imageReducerUpload", imageReducerUpload);

router.post("/localFileUpload", localFileUpload);
router.post("/imageUpload", imageUpload);
router.post("/videoUpload", videoUpload);


module.exports = router;