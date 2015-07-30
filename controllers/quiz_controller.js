var models = require('../models/models.js');
// Autoload - factoriza el código si ruta incluye :quizId
exports.load = function(req, res, next, quizId) {
  models.Quiz.find(quizId).then(
    function(quiz) {
      if (quiz) {
        req.quiz = quiz;
        next();
      } else { next(new Error('Not found quizId=' + quizId)); }
    }
  ).catch(function(error) { next(error);});
};

// GET /quizes  list of questions
// GET  /quizes?search=text  filter list of questions
exports.index = function(req, res) {
  var filter = {};
  if(req.query.search){
    search = req.query.search;
    search = search.split(" ").join("%");
    search = "%" + search + "%";
    filter = {
      where: ["lower(pregunta) like lower(?)", search],
      order: [["pregunta", "ASC"]]
    };
  }

  models.Quiz.findAll(filter).then(
    function(quizes) {
      res.render('quizes/index', { quizes: quizes});
    }
  ).catch(function(error) { next(error);})
};

// GET /quizes/:id
exports.show = function(req, res) {
  res.render('quizes/show', { quiz: req.quiz});
};

// GET /quizes/:id/answer
exports.answer = function(req, res) {
  var resultado = 'Wrong';
  if (req.query.respuesta.toUpperCase() === req.quiz.respuesta.toUpperCase()) {
    resultado = 'Right';
  }
  res.render('quizes/answer', {quiz: req.quiz, respuesta: resultado});
};

// GET /quizes/new
exports.new = function(req, res) {
  var quiz = models.Quiz.build(
    {pregunta: "Question", respuesta: "Answer"}
  );

  res.render('quizes/new', {quiz: quiz});
};

// POST /quizes/create
exports.create = function(req, res) {
  var quiz = models.Quiz.build( req.body.quiz );

// guarda en DB los campos pregunta y respuesta de quiz
  quiz.save({fields: ["pregunta", "respuesta"]}).then(function(){
    res.redirect('/quizes');
  })   // res.redirect: Redirección HTTP a lista de preguntas
};
