const mongoose = require("mongoose");

const sectionSchema = new mongoose.Schema({
    sectionName: {
        type: String
    },
    subSection: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Subsection"
    }
});

module.exports = mongoose.model("Section", sectionSchema);