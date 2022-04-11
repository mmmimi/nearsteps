const Customer = require('../models/customers');
const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const mapBoxToken = process.env.MAPBOX_TOKEN;
const geocoder = mbxGeocoding({ accessToken: mapBoxToken });

module.exports.index = async (req, res) => {
    const customers = await Customer.find({});
    res.render('customers/index', { customers })
}

module.exports.renderNewForm = (req, res) => {
    res.render('customers/new');
}

module.exports.showCustomer = async (req, res) => {
    const customer = await Customer.findById(req.params.id)
    res.render('customers/show', { customer });
}

module.exports.createCustomer = async (req, res, next) => {
    //console.log(req.body)
    
    const locationData = 
    req.body.customer.address1 + ','+
    req.body.customer.address2 + ','+
    req.body.customer.plz + ','+
    req.body.customer.city + ','+
    'Austria'
    //console.log(locationData)

    const geoData = await geocoder.forwardGeocode({
        query: locationData,
        limit: 1
    }).send()
    const customer = new Customer(req.body.customer);
    customer.geometry = geoData.body.features[0].geometry;
    //customer.images = req.files.map(f => ({ url: f.path, filename: f.filename }));
    
    await customer.save();
    //console.log(customer);
    
    res.redirect(`/customers/${customer._id}`)
}