import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import db from './utils/db.js'
//import all routes here
import userRoutes from './routes/user.routes.js'
import cookieParser from 'cookie-parser'
//git commit 
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
app.use(cookieParser()); //to parse cookies from the request object




const port = process.env.PORT || 4000;

app.get('/', (req, res) => {
  res.send('Cohort!');
})

app.post('/', (req, res) => {
  res.send('POST request received at /');
});

app.get('/Aditya', (req, res) => {
  res.send('Aditya!');
})

app.get('/Anup', (req, res) => {
  res.send('Anup!');
})


// Connect to MongoDB
db();

//user routes
app.use("/api/v1/user/", userRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

