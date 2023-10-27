const express = require('express');
const cors = require('cors');
const PORT = 3000;
const app = express();

app.use(cors({
  origin: 'http://127.0.0.1:5500',
}));

app.use(express.json());

app.use('/users', require('./routers/user.route'));

app.listen(PORT, (req,res)=> {
  console.log(`Server is running at http://localhost:${PORT}/users/read`)
})


