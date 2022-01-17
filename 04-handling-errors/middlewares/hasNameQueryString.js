module.exports = (req, res, next) => {
  if (req.query.name) next();
  else res.status(400).send('A name is needed')
};