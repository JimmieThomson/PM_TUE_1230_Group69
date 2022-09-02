// const express = require('express');
// const app = express();
// const bodyParser = require('body-parser')
// const mongoose = require('mongoose');
// mongoose.connect('mongodb+srv://adtic123:2412noel@cluster0.tw3vz.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser : true }, { useUnifiedTopology: true })
// const db = mongoose.connection
// db.on('error', (error) => console.log(error))
// db.once('open', () => console.log('Connected To Database'))
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

// configure the app to use bodyParser()
app.use(bodyParser.urlencoded({
    extended: true
}));
const bodyparserpost = bodyParser.urlencoded({
  extended: true
})
app.use(bodyParser.json());
const quotesRouter = require('./routes/gpsinfo')
app.use('/gpsInfo', quotesRouter);
app.get('/', (req, res) => {
  res.send('root')
})
app.post('/', bodyparserpost, async (req,res)=> {
  console.log(req.body)
  res.send("bruh")
})
app.listen(3000, () => console.log('Db server started'))