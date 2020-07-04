'use strict'
const router = require("express").Router();
const user=require('../app/controllers/user');
const products=require('../app/controllers/products');
const isAuthenticated = require("../middleware/Auth");
const uploadImage = require('../helpers/imagesUpload/Upload');
const multer = require("multer");
module.exports = (app, passport) => {
    const storage = multer.diskStorage({
        destination: function(req, file, cb) {
            cb(null, './uploads/');
        },
        filename: function(req, file, cb) {
            cb(null,file.originalname);
        }
    });
    // other format can't be uploaded
    const fileFilter = (req,file,cb) => {
        if(file.mimetype === 'image/jpeg'||file.mimetype === 'image/png'||file.mimetype === 'image/svg'){
            cb(null,true);
        } else {
            cb(new Error('file should be jpeg or png'),false);
        }
    }
    const upload = multer({
        storage:storage,
        //limits for uploading image
        limits:{
            fileSize:1024*1024*5
        },
        fileFilter:fileFilter
    })
    //user routes
    router.post("/signup", user.signUp);
    router.post("/login",user.login);
    router.post("/create/product",isAuthenticated,upload.any('imageUrl'),products.addProduct);
    router.get("/getAllProducts",products.getAllProducts);
    router.get("/getProductById/:id",isAuthenticated,products.getProductById);
    router.patch("/productUpdate/:id",isAuthenticated,upload.single('imageUrl'),products.productUpdate);
    router.delete("/deleteProducts/:id",isAuthenticated,products.deleteProducts);
    return router;
}
