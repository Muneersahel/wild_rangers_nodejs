var telerivet = require('telerivet');
const { config } = require('../config/variables.config');
const { user: User } = require('../models/index.model');

exports.getDashboard = (req, res, next) => {
    res.render('dashboard');
};

exports.getRanger = (req, res, next) => {
    res.render('ranger-details');
};

exports.getRangers = async (req, res, next) => {
    const tr = new telerivet.API(config.telerivet.apiKey);
    const project = await tr.initProjectById(config.telerivet.projectId);

    const table = await project.initDataTableById(config.telerivet.dataTableId);

    const cursor = await table.queryRows();
    const rangers = [];
    await cursor.each(async function (err, row) {
        if (row) {
            rangers.push(row.data);
        } else {
            res.render('rangers-list', { rangers: rangers });
        }
    });
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
