var db = require('../config/db.config');

// Get all companies from the database
const getAllCompanies = (req, res) => {
    console.log(`${req.method} ${req.url}`)
    db.connect(function (err) {
        if (err) throw err;
        db.query('SELECT * FROM companies ORDER BY id desc', function (err, rows) {
            if (err) {
                console.log(err);
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while retrieving companies."
                });
            } else {
                res.send(rows);
            }
        })
    });
}


//Get a single company using id
const getCompanyById = (req, res) => {
    console.log(`${req.method} ${req.url}`)
    var { id } = req.params;
    console.log(id)
    db.query('SELECT * FROM companies WHERE id = ' + parseInt(id), function (err, rows) {
        if (err) {
            console.log(err);
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving the company."
            });
        } else {
            rows.length ? res.json(rows) : res.status(400).send(`Company with the id ${id} does not exist`);
        }
    })
}

//Get companies that exports to a given continent
const exportsTo = (req, res) => {
    console.log(`${req.method} ${req.url}`)
    var continent = req.params;
    continent = continent.param;
    continent = continent.replace(/[^A-Z0-9]+/ig, " ");
    db.query('SELECT * FROM api.companies where find_in_set(?,exportsTo) ', continent, function (err, rows) {
        if (err) {
            console.log(err);
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tutorials."
            });
        } else {
            rows.length ? res.send(rows) : res.status(400).send(`All companies do not export to ${continent}`);
        }
    })
}

module.exports = {
    getAllCompanies,
    getCompanyById,
    exportsTo
}