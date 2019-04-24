const router = require("express").Router();
const db = require("../../models");

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

function updatePortfolioItem(req,res){
  console.log(req.body);
  
  db.Portfolio
    .updateOne(
      { userId: req.params.id, "images._id": req.body._id },
      req.body.url || req.body.about || req.body.title ? 
      { $set: { 
        "images.$.url" : req.body.url,
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
    })
};

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
  .patch(updatePortfolioItem)
  .post(createPortfolioItem)
  .delete(deletePortolioItem)
  

module.exports = router;