const { user: User } = require('../models/index.model');

exports.getDashboard = (req, res, next) => {
    res.render("dashboard");
};

exports.getLogin = (req, res, next) => {
    res.render("login");
};

exports.getRanger = (req, res, next) => {
    res.render("ranger-detals");
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
