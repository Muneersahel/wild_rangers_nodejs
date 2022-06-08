var telerivet = require('telerivet');
const { config } = require('../config/variables.config');
const { user: User } = require('../models/index.model');

exports.getRangersList = (req, res, next) => {
    var tr = new telerivet.API(config.telerivet.apiKey);
    var project = tr.initProjectById(config.telerivet.projectId);

    var table = project.initDataTableById(config.telerivet.dataTableId);

    var cursor = table.queryRows();

    cursor.limit(50).each((err, row) => {
        if (err) {
            console.log(err);
        }
        if (row) {
            console.log(row.data);
        }
    });
};

exports.getDashboard = (req, res, next) => {
    res.render('dashboard');
};

exports.getRanger = (req, res, next) => {
    res.render('ranger-details');
};

exports.getRangers = (req, res, next) => {
    res.render('rangers-list');
};

exports.getUsers = (req, res) => {
    User.findAll()
        .then((users) => {
            res.send(users);
        })
        .catch((err) => {
            res.status(500).send({
                message:
                    err.message ||
                    'Some error occurred while retrieving users.',
            });
        });
};
