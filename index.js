import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'

dotenv.config()

const app = express()

app.use(
  cors({
    origin : process.env.BASE_URL,
     credentials : true,
    methods : ['GET', 'POST', 'DELETE', 'OPTIONS'],
    allowedHeaders : ['Content-Type', 'Authorization'] 
  })
);
app.use(express.json()); // to get .json type data from frontend to backend.
app.use(express.urlencoded({extended:true})) //it helps with your url issues like space between etc.

const port = process.env.PORT || 4000;

app.get('/', (req, res) => {
  res.send('Cohort!');
})

app.get('/Aditya', (req, res) => {
  res.send('Aditya!');
})

app.get('/Anup', (req, res) => {
  res.send('Anup!');
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

