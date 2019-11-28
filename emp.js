var mysql = require("mysql");
var express = require("express");
var joi = require("joi");
var app = express();

app.use(express.json());

var connection = mysql.createConnection({
    "host":"localhost",
    "database":"EXAM",
    "user":"dac",
    "password":"dac"
});

app.get("/emps",(req,res)=>
{
    connection.connect();
    var sql = "select * from Emp";
    connection.query(sql,(err,result)=>
    {
        if(err == null)
        {
        res.send(JSON.stringify(result));
        }
        else
        {
        res.send(JSON.stringify(err));
        }
    });
    connection.end();
});

app.post("/emps",(req,res)=>{
    var vResult = validation(req.body);

    if(vResult.error == null)
    {
        console.log("No error");
    }
    else
    {
        console.log("Error");
        console.log(vResult.error);
    }
});



function validation(reqbody)
{
    var validationSchema =
    {
        No:joi.number().required(),
        Name:joi.string().required(),
        Age:joi.number().required().min(15).max(60)
    };
    return joi.validate(reqbody,validationSchema);
}

app.listen(7744,()=>{
    console.log("7744 Server started...");
});


