require ('dotenv').config()

const express=require('express');
const app=express()
const mongoose=require('mongoose');

mongoose.connect(process.env.DATABASE_URL,{useNewUrlParser: true})
const db=mongoose.connection;

db.on('error',(error)=>
console.error(error)
)
db.once('open',()=> console.log('Connected to daatabse'));

app.use(express.json())
const test_Router=require('./routes/test')
app.use('/test',test_Router)


app.listen(3000,()=>{
    console.log('Server Started');
})
app.get('/api/v3/app/events', (req, res) => {
    res.status(200).json({ message: 'Events here!' });
});