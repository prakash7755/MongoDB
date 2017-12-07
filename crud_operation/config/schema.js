'use strict'
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const usersSchema = new Schema({
	name : String,
	age : Number
})

module.exports = mongoose.model('users', usersSchema)