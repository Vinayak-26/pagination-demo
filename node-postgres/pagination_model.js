const { request } = require('express')
const Pool = require('pg').Pool
const pool = new Pool({
  user: 'books_user',
  host: 'localhost',
  database: 'books_database',
  password: 'root',
  port: 5432,
});

const createUser = (body) => {
  return new Promise(function(resolve, reject) {
    const { id, email, password } = body
    const query = 'INSERT INTO users (id, email, password) VALUES ($1, $2, $3)'
    const values = [id, email, password];
    pool.query(query, values, (error, results) => {
      if (error) {
        console.error('Error registering user:', error)
        
      } else {
        resolve('User registered successfully')
        
      }
    })
  })
}

const loginUser = (body) => {
  return new Promise(function(resolve, reject) {
    const { email, password } = body;
    const query = 'SELECT * FROM users WHERE email = $1 AND password = $2';
    const values = [email, password];
    pool.query(query, values, (error, results) => {
      if (error) {
        reject(error)
        console.error('Incorrect credentials', error)
      }
      else{
      if(results.rows.length > 0){
        resolve({success : true, message : 'Login Successful'})
      }
      else{
        resolve({success : false, message : 'Incorrect credentials'})
      }
    }
    })
  })
}

const getBookList = async (page, perPage) => {
  try {
    //page 2 perpage 3
    const offset = (page - 1) * perPage;
    //offset 3 limit 3
    const query = 'SELECT * FROM books OFFSET $1 LIMIT $2';
    const values = [offset, perPage];
    const result = await pool.query(query, values);
    const books = result.rows;
    console.log(books);
    console.log(page);
    return(books); 
  } catch (error) {
    console.error('Error fetching books:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
module.exports = {
  createUser,
  loginUser,
  getBookList
}