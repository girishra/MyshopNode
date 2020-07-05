'use strict';
const mongoose = require('mongoose');
const User = require('../model/user');
const response = require('../../config/response');
const Product = require('../model/productModel');
module.exports = {

  //create product
    addProduct: async (req, res) => {
        try {
            let imageUrl;
            for (let i = 0; i < req.files.length; i++) {
                if (i == 0) {
                    imageUrl = req.files[i].path;
                }
            }
            const productData = new Product({
                ...req.body,
                imageUrl: imageUrl,
            });
            await productData.save();
            return response.success(res, productData, {
                message: 'Product created successfully',
            });
        } catch (error) {
            return response.error(res, error);
        }
    },

  //get all products details
  getAllProducts: async (req, res) => {
    try {
      const productData = await Product.find({});
      // console.log(data._id);
      if (productData && Object.keys(productData).length > 0) {
        return response.success(res, productData, { message: 'product details' });
      } else {
        return response.error(res, { message: 'No product Found' });
      }
    } catch (error) {
      return response.error(res, error);
    }
  },

  //get all details by ID
    getProductById: async (req, res) => {
        try {
            //find product details by ID
            let productData = await Product.findOne({_id:req.params.id});
            //check if product record in the database
            if(productData) {
                return response.success(res, productData);
            } else {
                return response.error(res, {message :"Product doesn't exist with the ID"})
            }
        } catch(error) {
            return response.error(res, error);
        }
    },

  //delete General App Settings
  deleteProducts: async (req, res) => {
    try {
      const productsData = await Product.findByIdAndDelete(
        req.params.id
      );
      if (!productsData) {
        return response.error(res, {
          info: 'No products Found by the ID',
        });
      }
      return response.success(res, productsData, {
        message: 'product deleted successfully',
      });
    } catch (error) {
      return response.error(res, error);
    }
  },

    productUpdate: async (req, res) =>{
    const id = req.params.id;
    const body = req.body;
    const title = body.title;
    const description = body.description;
    const price = body.price;
    const updates = {
      ...req.body
    };
    if (req.file) {
      const imageUrl = req.file.path;
      updates.image = imageUrl;
    }
    Product.findByIdAndUpdate(id, {
      $set: updates
    }, {
      new: true
    }).then(post => {
      return response.success(res, updates,{ info: "products Successfully updated" })
    })
        .catch(err => {
          res.status(400).send({error:"Invalid updates"})
        });
  },
    getCartItems: async (req, res) => {
        try {
            const cart = await Product.find({
                cartItem: 'true'
            });

            if (cart && Object.keys(cart).length > 0) {
                return response.success(res, cart, { message: 'cart-details' });
            } else {
                return response.error(res, { message: 'No product found' });
            }
        } catch (error) {
            return response.error(res, error);
        }
    },
    addtoCart: async (req, res) => {
        const updates=Object.keys(req.body)
        const allowedUpdates=['cartItem']
        const isValidOperation=updates.every((update)=>allowedUpdates.includes(update))
        if(!isValidOperation){
            res.status(400).send({error:"Invalid updates"})
        }
        try {
            const cartItem=await Product.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true})
            if(!cartItem){
                return res.status(404).send()
            }
            return response.success(res, cartItem,{ info: "successfully add to cart" })
        } catch (error) {
            return response.error(res, error);
        }
    },
    getAllOrders: async (req, res) => {
        try {
            const allOrders = await Product.find({
                isOrdered: true
            });

            if (allOrders && Object.keys(allOrders).length > 0) {
                return response.success(res, allOrders, { message: 'orders-details' });
            } else {
                return response.error(res, { message: 'No order found' });
            }
        } catch (error) {
            return response.error(res, error);
        }
    },
    order: async (req, res) => {
        const updates=Object.keys(req.body)
        const allowedUpdates=['isOrdered']
        const isValidOperation=updates.every((update)=>allowedUpdates.includes(update))
        if(!isValidOperation){
            res.status(400).send({error:"Invalid updates"})
        }
        try {
            const orders=await Product.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true})
            if(!orders){
                return res.status(404).send()
            }
            return response.success(res, orders,{ info: "successfully ordered" })
        } catch (error) {
            return response.error(res, error);
        }
    },
};
