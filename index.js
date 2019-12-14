const express = require("express");
const multipart = require("multiparty");
const cors = require("cors");
const fs = require("fs");

const app = express();
const port = 5000;
const folderPath = "files/";

app.use(cors());

app.post("/upload", (req, res) => {
  const form = new multipart.Form();

  return form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(400).send({ error: err });
    }

    const { originalFilename, path } = files.file[0];

    return fs.rename(path, `${folderPath}${originalFilename}`, error => {
      if (error) {
        return res.status(400).send({ error });
      }
      return res.status(200).send({ file: originalFilename });
    });
  });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
