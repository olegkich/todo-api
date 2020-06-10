const Pool = require('pg').Pool
require('dotenv').config()

const pool = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: 'localhost',
    port: '5432',
    database: 'todo'
})
console.log(process.env.DB_PASSWORD)
module.exports = pool