'use strict'
const mongoose = require("mongoose");
const productSchemaStructure = new mongoose.Schema({
    title: {
        type: String,
        default:null
    },
    description: {
        type: String,
        default: null
    },
    price:{
        type:String,
        default: null
    },
    cartItem:{
        type:String,
        default:'false'
    },
    isOrdered:{
        type:Boolean,
        default:false
    },
    imageUrl: {
        type: String,
        default: null
    }
},{
    timestamps: true
})
module.exports={productSchemaStructure:productSchemaStructure}
