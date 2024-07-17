const multer = require('multer');
const Folder = require('../model/documentsmodel');


const upload = multer({ dest: 'uploads/' });

  exports.getFolders = async (req, res) => {
    const { userId } = req.userId;
    const folders = await Folder.find({ userId });
    res.send(folders);
  };
  
  exports.createFolder = async (req, res) => {
    const { name } = req.body;
    const { userId } = req.userId;
    const folder = new Folder({ name, userId, documents: [] });
    await folder.save();
    res.send(folder);
  };
  
  exports.reNameFolder = async (req, res) => {
    const { name } = req.body;
    const { userId } = req.userId;
    const folder = await Folder.findOne({ _id: req.params.id, userId });
    folder.name = name;
    await folder.save();
    res.send(folder);
  };
  
  exports.deleteFolder = async (req, res) => {
    const { userId } = req.userId;
    await Folder.findOneAndDelete({ _id: req.params.id, userId });
    res.send({ message: 'Folder deleted' });
  };
  
  exports.uploadDocument = async (req, res) => {
    const { userId } = req.userId;
    const folder = await Folder.findOne({ _id: req.params.id, userId });
    folder.documents.push({
      name: req.file.originalname,
      fileUrl: `uploads/${req.file.filename}`,
    });
    await folder.save();
    res.send(folder);
  };
  
  exports.reNameDocument = async (req, res) => {
    const { name } = req.body;
    const { userId } = req.userId;
    const folder = await Folder.findOne({ _id: req.params.folderId, userId });
    const document = folder.documents.id(req.params.documentId);
    document.name = name;
    await folder.save();
    res.send(folder);
  };
  
  exports.deleteDocument = async (req, res) => {
    const { userId } = req.userId;
    const folder = await Folder.findOne({ _id: req.params.folderId, userId });
    folder.documents.id(req.params.documentId).remove();
    await folder.save();
    res.send(folder);
  };