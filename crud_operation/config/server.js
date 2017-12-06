var express  = require('express');
var mongoose = require('mongoose');
var app      = express();
var database = require('./database');
var bodyParser = require('body-parser');         // pull information from HTML POST (express4)
// var methodOverride = require('method-override');
 
var port     = process.env.PORT || 3000;
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                       // parse application/json
// app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
// app.use(methodOverride());
 
var Employee = require('./employee');
 
mongoose.connect(database.url);
 



app.get('/api/employees', function(req, res) {
 Employee.find(function(err, employees) {
 if (err)
 res.send(err)
 res.json(employees); 
 });
});






// get a employee with ID of 1
app.get('/api/employees/:employee_id', function(req, res) {
	let id = req.params.employee_id;
	Employee.findOne(id, function(err, employee) {
		if (err)
			res.send(err)

		res.json(employee);
	});

});





// create employee and send back all employees after creation
app.post('/api/employees', function(req, res) {
 // create mongose method to create a new record into collection
 Employee.insert({
 name : req.body.name,
 salary : req.body.salary,
 age : req.body.age
 }, function(err, employee) {
 if (err)
 res.send(err);
 
 // get and return all the employees after newly created employe record
 Employee.find(function(err, employees) {
 if (err)
 res.send(err)
 res.json(employees);
 });
 });
 
});





// create employee and send back all employees after creation
app.put('/api/employees/:employee_id', function(req, res) {
 // create mongose method to update a existing record into collection
 let id = req.params.employee_id;
 var data = {
 name : req.body.name,
 salary : req.body.salary,
 age : req.body.age
 }
 
 // save the user
 Employee.findOneAndUpdate(id, data, function(err, employee) {
 if (err) throw err;
 
 res.send('Successfully! Employee updated - '+employee.name);
 });
});







// delete a employee by id
app.delete('/api/employees/:employee_id', function(req, res) {
	let id = req.params.employee_id;
	Employee.remove({
		_id : id
	}, function(err) {
		if (err)
			res.send(err);
		else
			res.send('Successfully! Employee has been Deleted.');	
	});
});




app.listen(port);
console.log("App listening on port : " + port);
