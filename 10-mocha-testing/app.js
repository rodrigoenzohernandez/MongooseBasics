const express = require('express');
const app = module.exports = express();
app.use(require('./middlewares/request-time'));
app.get('/unix-timestamp', (req, res) => {
  res.json({
    timestamp: Math.floor(req.requestTime / 1000)
  }) ;
});
//This allows not to start the server on port 3000 if we are requiring from other module.
if (require.main === module) {
  app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
  });
}
