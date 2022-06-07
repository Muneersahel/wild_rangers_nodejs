const { user: User } = require('../models/index.model');

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
