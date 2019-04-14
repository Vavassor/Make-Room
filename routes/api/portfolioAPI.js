const router = require("express").Router();
const db = require("../../models");

function getPortfolioById(req, res){
  console.log(req.params.id);
  db.Portfolio
  .find({userId: req.params.id})
  .then(data => {
    // console.log(data)
    res.json(data);
  })
  .catch(err => res.status(422).json(err))
};

function updatePortfolio(req, res){

}

function deletePortfolio(req, res){

}

function routeHit(req, res){
  console.log("get route hit")
  res.send("get route hit")
}

router.route("/")
  .get(routeHit);


router.route("/:id")
  .get(getPortfolioById)
  .patch(updatePortfolio)
  .delete(deletePortfolio);

module.exports = router;