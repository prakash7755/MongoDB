'use strict'

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require("body-parser")
const Users = require('./schema.js')
const app = express();
const port     = process.env.PORT || 3000;


mongoose.connect("mongodb://localhost/students", function(err) {
       if (err) {
       	console.log("db not connected")
       }
       console.log("db connected")
	})



app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());


app.post("/", (req, res) => {
      let user = new Users()
      user.name = req.body.name;
      user.age = req.body.age;

      user.save((err) => {
      	if (err) {
      		console.log("user insert failed ")
      	}
      	res.json({msg : "user saved"})
      })
})


app.get("/allUsers", (req, res) => {
	users.find((err, docs) => {
		if (err) {
			console.log("No Users")
		}
      if(docs){
		res.json(docs)
		}
	})
})


app.put('/allUsers/:id', function(req, res) {
 let id = req.params.employee_id;
 var data = {
 name : req.body.name,
 salary : req.body.salary,
 age : req.body.age
 }
  users.findByIdAndUpdate(id, data, function(err, doc) {
 if (err) throw err;
 res.json(doc);
 });
});


app.delete('/allUsers/:id', function(req, res) {
	let id = req.params.employee_id;
	users.remove({
		_id : id
	}, function(err) {
		if (err){
			res.send(err);
		}
		else{
			res.send('Successfully! Employee has been Deleted.');	
		}
	});
});





app.listen(port, () => console.log("port connected " + port) )
