'use strict';
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const userSchemaStructure = new mongoose.Schema({
    name: {
        type: String,
        default:null
    },
    password: {
        type: String,
        required:true
    },
    email: {
        unique:true,
        type: String,
        required:true
    }
},{
    timestamps:true
})
//method to encrypt password
userSchemaStructure.methods.encryptPassword = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10));
};
//method to validate password
userSchemaStructure.methods.isValidPassword = function isValidPassword(password) {
    return bcrypt.compareSync(password, this.password);
};

//method to get user profile by ID@
userSchemaStructure.methods.getUserById = function(id, callback){
    User.findById(id, callback);
}
module.exports={userSchemaStructure:userSchemaStructure}
