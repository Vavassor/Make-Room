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

function updatePortfolio(req, res){
  console.log(req.body)
  db.Portfolio
    .updateOne(
      {userId: req.params.id},
      {portfolioDetails: req.body.portfolioInfo}
      )
    .then(data => res.json(data))
    .catch(err => res.staus(422).json(err))
};

function createPortfolioItem(req, res){
  db.Portfolio
  .updateOne(
    {userId: req.params.id},
    {$push: {images:{}}},
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
      { $set: { 
        "images.$.url" : req.body.url,
        "images.$.about" : req.body.about,
        "images.$.order" : req.body.order,
        "images.$.title" : req.body.title,
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
console.log("delete Item Api", req.params.id);
console.log(req.params.itemId);
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
  .patch(updatePortfolio)
  .delete(deletePortfolio);

router.route("/item/:id/:itemId?")
  .patch(updatePortfolioItem)
  .post(createPortfolioItem)
  .delete(deletePortolioItem)
  

module.exports = router;