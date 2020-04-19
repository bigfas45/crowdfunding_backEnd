const formidable = require("formidable");
const _ = require("lodash");
const fs = require("fs");
const SchoolInfo = require("../modles/schoolInfo");
 const { errorHandler } = require("../helpers/dbErrorHandler");


 exports.create = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;
    form.parse(req, (err, fields, files) => {
      if (err) {
        return res.status(400).json({ error: "File could not be uploaded" });
      }
      // check for all fields
      const { name, address, moto, open, close,year,logo } = fields;
  
      if (!name || !address || !moto || !open|| !close|| !year  ) {
        return res.status(400).json({
          error: " All fields are required "
        });
      }
  
      let schoolInfo = new SchoolInfo(fields);
      if (files.logo) {
        console.log("FILES PHOTO", files.logo);
        schoolInfo.logo.data = fs.readFileSync(files.logo.path);
        schoolInfo.logo.contentType = files.logo.type;
      }
  
      schoolInfo.save((err, result) => {
        if (err) {
          return res.status(400).json( err );
        }
        res.json(result);
      });
    });
  };


