require('dotenv').config();
const mongoose = require('mongoose');

const db_url = process.env.DATABASE_URI;

const db = async () => {
    try {
        mongoose.set('strictQuery', false);
        await mongoose.connect(db_url, {
        });
        console.log('Db Connected');
    } catch (error) {
        console.log(error)
        console.log('DB Connection Error');
    }
}

module.exports = { db };
