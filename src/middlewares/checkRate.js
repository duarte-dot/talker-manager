const checkRate = (req, _res, next) => {
  const { rate } = req.body;

  if (rate === undefined) {
    return next({ status: 400, message: 'O campo "rate" é obrigatório' });
  }
  
  if (!Number.isInteger(rate) || Number(rate) < 1 || Number(rate) > 5) {
    next({ status: 400, message: 'O campo "rate" deve ser um número inteiro entre 1 e 5' });
    }

  return next();
};

module.exports = checkRate;