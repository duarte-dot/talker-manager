const checkTalkRate = (req, res, next) => {
  const { talk } = req.body;
  const { rate } = talk;

  if (rate === undefined) {
    return next({ status: 400, message: 'O campo "rate" é obrigatório' });
  }

  if (!Number.isInteger(rate) || Number(rate) < 1 || Number(rate) > 5) {
    return next({ status: 400, message: 'O campo "rate" deve ser um número inteiro entre 1 e 5' });
  }

  return next();
};

// função abaixo funciona, mas tem complexidade 6.

// const checkRate = (req, res, next) => {
//   const rate = req.body.talk ? req.body.talk.rate : req.body.rate;

//   if (rate === undefined) {
//     return next({ status: 400, message: 'O campo "rate" é obrigatório' });
//   }
  
//   if (!Number.isInteger(rate) || rate < 1 || rate > 5) {
//     return next({ status: 400, message: 'O campo "rate" deve ser um número inteiro entre 1 e 5' });
//   }

//   return next();
// };

module.exports = checkTalkRate;