const products = require('../data/products')
const { v4: uuidv4 } = require('uuid')
const { writeDataToFile } = require('../utils')

function findAll() {
    return new Promise((resolve, reject) => {
        resolve(products)
    })
}

function findById(id) {
    return new Promise((resolve, reject) => {
        const product = products.find((p) => p.id === id)

        resolve(product)
    })
}

function create(product) {
    return new Promise((resolve, reject) => {
        const newProduct = {id: uuidv4(), ...product}

        products.push(newProduct)
        writeDataToFile('./data/products.json', products)

        resolve(newProduct)
    })
}

function update(id, details) {
    return new Promise((resolve, reject) => {
        const index = products.findIndex((p) => p.id === id)

        products[index] = {id, ...details}

        writeDataToFile('./data/products.json', products)

        resolve(products[index])
    })
}

function destroy(id) {
    return new Promise((resolve, reject) => {
        const index = products.findIndex((p) => p.id === id)

        products.splice(index, 1) //remove 1 item from this index

        writeDataToFile('./data/products.json', products)

        resolve(products[index])
    })
}

module.exports = {
    findAll,
    findById, create, update, destroy
}