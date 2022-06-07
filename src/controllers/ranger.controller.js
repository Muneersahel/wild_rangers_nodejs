var telerivet = require('telerivet');
const { config } = require('../config/variables.config');

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
