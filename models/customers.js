const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ImageSchema = new Schema({
    url: String,
    filename: String
});

ImageSchema.virtual('thumbnail').get(function () {
    return this.url.replace('/upload', '/upload/w_200');
});

const CustomerSchema = new Schema({
    title: String,
    email: String,
    tel: String,
    address1: String,
    address2: String,
    plz: Number,
    city: String,
    country: String,
    
    images: [ImageSchema],
    geometry: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    contact: {
        firstName: String,
        lastName: String,
        gender: String,
        birthDate: Date,
        email: String,
        tel: String
    },
    billing: {
        legalForm: String,
        uid: String,
        iban: String,
        bic: String,
        creditCard: String,
        expires: String,
        cvc: Number,
        billingAddress1: String,
        billingAddress2: String,
        billingPLZ: Number,
        billingCity: String,
        billingCountry: String,
    }
})

module.exports = mongoose.model('Customer', CustomerSchema)