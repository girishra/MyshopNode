'use strict';
const mongoose=require('mongoose')
const userSchemaStructure = require('../schemas/userSchema');
const userSchema = new mongoose.Schema(userSchemaStructure.userSchemaStructure);
module.exports = mongoose.model('User',userSchema)
