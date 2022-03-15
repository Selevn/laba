import express, {request} from 'express';
import {create} from "express-handlebars";
import {add, del, get, getByName, update} from "./model.js";
import bodyParser from "body-parser";
const hbs = create({extname:'.hbs', helpers:{
    back: ()=>'<a href="/">Decline</a>'
    }})

const app = express();
app.use(express.static('static'));
app.use(bodyParser.json())
app.engine('.hbs', hbs.engine)
app.set("view engine", ".hbs");

app.post('/create', bodyParser.urlencoded({ extended: true }), (req,res)=>{
    add(req.body)
    res.render("index", {
        data: get(),
        isBase: true,
    });
})

app.post('/delete', bodyParser.urlencoded({ extended: true }), (req,res)=>{
    del(req.body)
    res.render("index", {
        data: get(),
        isBase: true,
    });
})

app.post('/update', bodyParser.urlencoded({ extended: true }), (req,res)=>{
    update(req.body)
    res.render("index", {
        isBase: true,
        data: get(),
    });
})

app.get("/", function(_, response){
    response.render("index", {
        data: get(),
        isBase: true
    });
});
app.get("/update", function(request, response){
    response.render("index", {
        data: get(),
        item: getByName(request.query.name),
        isUpdate: true
    });
});
app.get("/add", function(_, response){
    response.render("index", {
        data: get(),
        isAdd: true
    });
});



app.listen(3000)