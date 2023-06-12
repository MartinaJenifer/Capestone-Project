require('dotenv').config();

const mongoose = require('mongoose');

const connectionStr = "Your mongoose connection string";

mongoose.connect("mongodb+srv://martinajenifer13:Martina%401399@martinajenifer.qfoms9g.mongodb.net/Recipes", {useNewUrlparser: true})
.then(() => console.log('connected to mongodb'))
.catch(err => console.log(err))

mongoose.connection.on('error', err => {
  console.log(err)
})
