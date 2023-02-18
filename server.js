if(process.env.NODE_ENV!=='production')
{
    require('dotenv').config()
}


const express=require('express')
const app=express()
const expressLayouts=require('express-ejs-layouts')
const mongoose=require('mongoose')
const bodyParser=require('body-parser')
const methodOverride=require('method-override')
mongoose.connect(process.env.DATABASE_URL,{useNewUrlParser:true})

const indexRouter=require('./routes/index')
const authorRouter=require('./routes/authors')
const bookRouter=require('./routes/books')

app.set('view engine','ejs')
app.set('views',__dirname+'/views')
app.set('layout','layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))
app.use(bodyParser.urlencoded({limit:'10mb',extended:false}))
app.use(methodOverride('_method'))

const db=mongoose.connection
db.on('error',error=>console.log(error))
db.once('open',()=>console.log('Connected to Mongoose'))

app.use('/',indexRouter)
app.use('/authors',authorRouter)
app.use('authors/new',authorRouter)
app.use('/books',bookRouter)

app.listen(process.env.PORT || 3000)
