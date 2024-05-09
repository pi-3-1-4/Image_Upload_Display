const mongoose = require('mongoose');

async function dbconnection(){
    await mongoose.connect(`${process.env.DBCONN}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log('Connected to MongoDB');
})
.catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});
}
module.exports = dbconnection