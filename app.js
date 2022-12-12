const express = require('express');

const { PORT = 3000 } = process.env;

const app = express();

app.get('/', (req, res) => {
  console.log(req);

  res.send('hello');
});

app.listen(PORT, () => {
  console.log('Server listen port 3000');
});
