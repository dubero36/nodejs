var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('chat2', {title: 'chat tutorial'});
});

router.get('/:room', function(req, res){
    console.log('room name is : ' + req.params.room);
    res.render('chat2_room', {room: req.params.room});
});

module.exports = router;