const express = require("express");
const playstore = require("./playstore");
const SERVER = express();

SERVER.get("/", (req, res) => {
res.send("It works");
});

SERVER.get("/apps/:sort/:genres?", (req, res) => {
  
  let sortValue = req.params.sort;
  if (sortValue == "Rating" || sortValue == "App") {
    if (!req.params.genres) {
      res.send(sortArray(playstore, req));
    } else {
      let genresValue = req.params.genres.split(",");
      let p = sortArray(playstore, req).filter(f => genresValue.includes(f.Genres));
      res.send(p);
    }
  
  } else {
    res.send("You can only pass in Rating or App to sort");
  }
});

function sortArray(array, req) {
  return array.sort(((a, b) => a[`${req.params.sort}`] - b[`${req.params.sort}`]));
}
module.exports = {SERVER};