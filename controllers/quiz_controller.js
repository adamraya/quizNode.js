// GET /quizes/question
exports.question = function(req, res) {
   res.render('quizes/question', {pregunta: 'What is the capital of Italy ?'});
};

// GET /quizes/answer
exports.answer = function(req, res) {
   if (req.query.respuesta.toUpperCase() === 'ROME' || req.query.respuesta.toUpperCase() === 'ROMA'){
      res.render('quizes/answer', {respuesta: 'Right'});
   } else {
      res.render('quizes/answer', {respuesta: 'Wrong'});
   }
};
