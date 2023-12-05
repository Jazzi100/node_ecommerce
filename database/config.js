// const mysql = require('mysql');

// const connection = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: '',
//   database: 'ecommerce',
// });

// connection.connect((err) => {
//   if (err) {
//     console.error('Error connecting to MySQL:', err);
//     return;
//   }
//   console.log('Connected to MySQL database');
// });

const mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017/ecommerce').then((value) => console.info('Connected to db successfully')).catch(e => console.warn('Error caught: ',e));