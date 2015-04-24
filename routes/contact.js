var express = require('express');
var router = express.Router();

/* GET users listing. */
router.post('/', function(req, res, next) {
  if(typeof req.body.message !== 'undefined'){
    res.status(200).json({'message': 'Thank you for reaching out!'});
  }else{
    res.status(500).json({'message': 'Please add a message.'});
  }
});

module.exports = router;
