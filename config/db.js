const mongoose = require('mongoose');
require('dotenv').config({path: '.env'});

const URI = process.env.MONGOOSE_URI;

const conectarDB = async() => {
    try {
        await mongoose.connect(URI,{
            useNewUrlParser: true,
            useUnifiedTopology:true,
        })
        console.log(`Conexión a BD "${process.env.NOMBREDB}" establecida`);
    } catch (error) {
        console.log(`Conexión a BD fallo`);
        console.log(error);
    }
}

module.exports = conectarDB;
