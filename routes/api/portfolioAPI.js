const aws = require("aws-sdk");
const db = require("../../models");
const generateFileName = require("../../helpers/FilenameGenerator");
const multer = require("multer");
const router = require("express").Router();
const upload = multer();

require("dotenv").config();

const S3_BUCKET = process.env.S3_BUCKET;
aws.config.region = "us-east-1";

function getPortfolioById(req, res){
  db.Portfolio
  .find({userId: req.params.id})
  .then(data => {
    res.json(data);
  })
  .catch(err => res.status(422).json(err))
};

function updatePortfolioInfo(req, res){
  let set=null;
  req.body.columnCount? set={porfolioaDisplayType: req.body.columnCount} : set={portfolioDetails: req.body.portfolioInfo};
  db.Portfolio
    .updateOne(
      {userId: req.params.id},
      set
      )
    .then(data => res.json(data))
    .catch(err => res.staus(422).json(err))
};

function createPortfolioItem(req, res){
  db.Portfolio
  .updateOne(
    {userId: req.params.id},
    {$push: { images:{} } },
    {new: true}
  )
  .then(data => {
    // console.log(data)
    res.json(data)
  })
  .catch(err => {
    console.log("create porfolio item api: ", err)
    res.status(422).json(err)
  })
}

function deletePortfolio(req, res){
  console.log(req)
};

function updatePortfolioItem(req, res) {
  const updateItem = (req, url) => {
    db.Portfolio
      .updateOne(
        { userId: req.params.id, "images._id": req.body._id },
        req.body.url || req.body.about || req.body.title ? 
        { $set: { 
          "images.$.url" : url,
          "images.$.about" : req.body.about,
          "images.$.title" : req.body.title,
          }
        }
        : { $set: { 
          "images.$.order" : req.body.order,
          }
        }
      )
      .then( data => {
        console.log(data)
        res.json(data)
      })
      .catch (err => {
        console.error(err);
        res.json(err);
      });
  };

  if (req.file) {
    const fileName = generateFileName(req.file.originalname);

    const s3 = new aws.S3();
    const s3Params = {
      Bucket: S3_BUCKET,
      Key: fileName,
      ContentType: req.file.mimetype,
      ACL: "public-read",
      Body: req.file.buffer,
    };

    s3.putObject(s3Params, (error, data) => {
      if (error) {
        throw error;
      }
      const url = `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`;
      updateItem(req, url);
    });
  } else {
    updateItem(req, req.body.url);
  }
}

function deletePortolioItem(req, res){
db.Portfolio
  .update(
    {userId: req.params.id}, 
    {$pull: {images: {_id: req.params.itemId} } }
    )
  .then(data => {
    // console.log(data);
    res.json(data)
  })
  .catch(err => {
    console.log(err)
    res.json(err);
  })
}

router.route("/info/:id")
  .get(getPortfolioById)
  .patch(updatePortfolioInfo)
  .delete(deletePortfolio);

router.route("/item/:id/:itemId?")
  .patch(
    upload.single("file"),
    updatePortfolioItem
  )
  .post(createPortfolioItem)
  .delete(deletePortolioItem)
  

module.exports = router;