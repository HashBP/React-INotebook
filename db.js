const mongoose = require('mongoose');
const mongoURL='mongodb+srv://hashbits:manchala69@cluster0.vzh1bkl.mongodb.net/INotebook'

const connectToMongo=()=>{
    mongoose.connect(mongoURL,()=>{
console.log('Connected to DB')
    })
}

module.exports=connectToMongo;
