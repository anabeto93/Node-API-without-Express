const Product = require('../models/productModel')
const { getPostData } = require('../utils') 

// @desc Gets All Products
// @route GET /api/products
async function getProducts(req, res) {
    try {
        const products = await Product.findAll()
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify(products))
    } catch (error) {
        console.log(error)
    }
}

// @desc Get Single Product
// @route GET /api/products/:id
async function getProduct(req, res, id) {
    try {
        const product = await Product.findById(id)

        if (!product) {
            res.writeHead(404, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({'message': 'Product not found.'}))
        } else {
            res.writeHead(200, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify(product))
        }
    } catch (error) {
        console.error(error)
    }
}

// @desc Get Single Product
// @route POST /api/products
async function createProduct(req, res) {
    try {
        const { name, description, price } = await getPostData(req)
        const body = {name, description, price}

        const product = await Product.create(body)

        res.writeHead(201, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({'message': 'Product created', 'product': product}))
    } catch (error) {
        console.error(error)
    }
}

// @desc Update Single Product
// @route PUT /api/products/:id
async function updateProduct(req, res, id) {
    try {
        const product = await Product.findById(id)

        if (!product) {
            res.writeHead(404, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({'message': 'Product not found.'}))
        } else {
            const { name, description, price } = await getPostData(req)
            
            const body = {
                name: name || product.name, 
                description: description || product.description, 
                price: price || product.price
            }

            const updatedProduct = await Product.update(product.id, body)
    
            res.writeHead(200, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({'message': 'Product updated', 'product': updatedProduct}))
        }
    } catch (error) {
        console.error(error)
    }
}

// @desc Delete Single Product
// @route DELETE /api/products/:id
async function deleteProduct(req, res, id) {
    try {
        const product = await Product.findById(id)

        if (!product) {
            res.writeHead(404, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({'message': 'Product not found.'}))
        } else {
            await Product.destroy(product.id)
    
            res.writeHead(200, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({'message': 'Product deleted.'}))
        }
    } catch (error) {
        console.error(error)
    }
}

module.exports = {
    getProducts, getProduct, createProduct, updateProduct, deleteProduct
}