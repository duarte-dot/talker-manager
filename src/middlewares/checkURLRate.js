const URLRateRegex = (rate) => {
  const rateNumbered = Number(rate);
  return Number.isInteger(rateNumbered) && rateNumbered >= 1 && rateNumbered <= 5;
};

const checkURLRate = (req, _res, next) => {
  const { rate } = req.query;

  if (rate && !URLRateRegex(rate)) {
    return next({ status: 400, message: 'O campo "rate" deve ser um número inteiro entre 1 e 5' });
  }

  return next();
};

module.exports = checkURLRate;