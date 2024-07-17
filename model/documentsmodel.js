const mongoose = require('mongoose');

const documentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  fileUrl: {
    type: String,
    required: true,
  },
});

const folderSchema = new mongoose.Schema({
  userId: { 
    type: String, 
    required: true 
  },
  name: {
    type: String,
    required: true,
  },
  documents: [documentSchema],
});

const Folder = mongoose.model('Folder', folderSchema);
module.exports = Folder;