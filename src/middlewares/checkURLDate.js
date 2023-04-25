const URLDateRegex = (date) => {
  const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;
  return dateRegex.test(date);
};

const checkURLDate = (req, _res, next) => {
  const { date } = req.query;

  if (date && !URLDateRegex(date)) {
    return next({ status: 400, message: 'O parâmetro "date" deve ter o formato "dd/mm/aaaa"' });
  }

  return next();
};

module.exports = checkURLDate;