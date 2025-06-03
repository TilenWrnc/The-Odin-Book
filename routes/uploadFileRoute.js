const { error } = require("console");
const query = require("../db/prisma")
const { Router } = require("express");
const multer = require("multer");
const { title } = require("process");
const path = require("node:path")

const filesRouter = Router();

const uploadTimestamp = (req, res, next) => {
  req.uploadTime = Date.now();
  next();
}

const fileStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null,"./files")
  },
  filename : (req, file, cb) => {
    cb(null, `${req.uploadTime}` + '--' + file.originalname)
  }
});
const upload = multer({storage: fileStorageEngine});

filesRouter.get("/", async (req, res) => {
  const currentFolder = null;
  const folders = await query.getFolders(currentFolder);
    res.render("upload", {
    title: "Upload Files",
    user: req.user,
    folders: folders,
  })
})

filesRouter.post("/upload_file", uploadTimestamp, upload.single("file"), query.postFile)
filesRouter.post("/upload_folder", query.postFolder)


filesRouter.get("/:folder", async(req, res) => {
  const currentFolder = parseInt(req.params.folder);
  const folders = await query.getFolders(currentFolder);
  res.render("folderDetails", {title: "Folder Details",user: req.user, folders: folders, folderId: currentFolder});
})

filesRouter.post("/:folder", query.postFolder)
filesRouter.post("/file/:folder", uploadTimestamp, upload.single("file"), query.postFile)

filesRouter.delete("/delete/:folder", async (req, res) => {
  const fileId = parseInt(req.params.folder);

  await query.deleteFile(fileId);
  res.redirect("/")
})

filesRouter.get("/edit/:fileForEditing", (req, res) => {
  const fileId = parseInt(req.params.fileForEditing);
  res.render("edit", {title: "Edit", user: req.user, fileId: fileId })
})
filesRouter.post("/edit/:fileForEditing", query.editFile)

filesRouter.use("/download/:fileToDownload", async (req, res) => {
  const fileToDownload = req.params.fileToDownload;
  const filePath = path.join(__dirname, "../files", fileToDownload);

  res.download(filePath, (err) => {
    if (err) {
      console.log(err)
    }
  })
})

module.exports = filesRouter;