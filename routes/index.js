var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controller');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'quizNode.js' });
});

router.get('/quizes/question', quizController.question);
router.get('/quizes/answer',   quizController.answer);
// Routes definition of credits
router.get('/author', function(req, res) {
res.render('author', { author: 'Adam Raya', errors: []});
});

module.exports = router;
