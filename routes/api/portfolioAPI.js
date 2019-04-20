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
  db.Portfolio
    .updateOne(
      {userId: req.params.id},
      {portfolioDetails: req.body.portfolioDetails}
      )
    .then(data => res.json(data))
    .catch(err => res.staus(422).json(err))
};

function deletePortfolio(req, res){

};

function updatePortfolioItems(req,res){
  console.log(req.body);
  // db.portfolio
  //   .updatOne(
  //     {userId: req.params.id}

  //   )

};

router.route("/info/:id")
  .get(getPortfolioById)
  .patch(updatePortfolio)
  .delete(deletePortfolio);

router.route("/item/:id")
  .patch(updatePortfolioItems);

module.exports = router;