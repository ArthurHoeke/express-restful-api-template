const config = require("../Models/config.models");
// const validatorService = require("../Services/validator.services")

const setSMTP = async (req, res) => {
    const smtpHost = req.body.smtpHost;
    const smtpPort = req.body.smtpPort;
    const smtpUsername = req.body.smtpUsername;
    const smtpPassword = req.body.smtpPassword;

    if(smtpHost == null || smtpPort == null || smtpUsername == null || smtpPassword == null) {
        res.sendStatus(400);
    } else {
        config.setSMTP([smtpHost, smtpPort, smtpUsername, smtpPassword], (err, data) => {
            if (err) {
                res.sendStatus(500);
            } else {
                SMTP_HOST = smtpHost;
                SMTP_PORT = smtpPort;
                SMTP_USERNAME = smtpUsername;
                SMTP_PASSWORD = smtpPassword;

                res.sendStatus(200);
            }
        });
    }
};

const getVariableList = async (req, res) => {
    config.getVariableList((err, data) => {
        if (err) {
            res.sendStatus(500);
        } else {
            res.status(200).json({
                data: data
            })
        }
    });
};

module.exports = {
    setSMTP,
    getVariableList
};