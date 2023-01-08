var express = require('express');
var router = express.Router();
const companyController = require("../controllers/companyController");


router.route('/companies')
    .get(companyController.getAllCompanies);

router.route('/companies/:id')
    .get(companyController.getCompanyById);

router.route('/companies/continent/:param')
    .get(companyController.exportsTo);


module.exports = router
