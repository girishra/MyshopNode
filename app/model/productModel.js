'use strict'
const mongoose = require("mongoose");
const appSchemaStrcture=require('../schemas/productSchema')
const appSchema = new mongoose.Schema(appSchemaStrcture.productSchemaStructure)
module.exports = mongoose.model("Products", appSchema)
