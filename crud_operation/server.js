'use strict'

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const Users = require('./schema.js')
const app = express();
const port = process.env.PORT || 3000;


mongoose.connect('mongodb://localhost/students', error => {
	if (error) {
		console.error('db not connected')
	}

	console.log('db connected')
})


/*
 * Midleware..
 */ 
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

/*
 * Retrive All USers From DB
 */ 

app.get('/api/users/', (req, res, next) => {
	Users.find({})
	.then(users => res.json(users))
	.catch(next);
});


/*
 * Create New User
 */ 

app.post('/api/users/', (req, res, next) => {

	const { name, age } = req.body || {};

	if (!name || !age) {
		const error = new Error('BadRequest');
		return next(error);
	}


    const user = new Users({ name, age });

	user.save()
	.then(data => res.json(data))
	.catch(next);

})


/*
 * Update User By ID
 */ 

app.put('/api/users/:id', (req, res, next) => {
	const { id } = req.params || {};

	if (!id) {
		const error = new Error('ID should Not Be Empty');
		return next(error);
	}

	const { name, age } = req.body || {};
	
	const updateObj = {};

	if (name) {
		updateObj.name = name;
	}

	if (age) {
		updateObj.age = age;
	}


	Users.findByIdAndUpdate(id, updateObj, {new: true})
	.then(data => res.json(data))
	.catch(next);
});


/*
 * REmove User By ID
 */ 

app.delete('/api/users/:id', (req, res, next) => {
	const { id } = req.params || {};

	if (!id) {
		const error = new Error('ID should Not Be Empty');
		return next(error);
	}

	Users.findByIdAndRemove(id)
	.then(data => res.json(data))
	.catch(next);
});



/*
 * Handle Errors
 */ 

app.use((error, req, res, next) => {
	const { message } = error || {};
	const isSuccess = false
;	res.json({message, isSuccess})
})


app.listen(port, () => console.log('port connected ' + port) )
