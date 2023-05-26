const createConfigTable = () => {
    const sqlQuery = `
        CREATE TABLE IF NOT EXISTS config (
        smtpHost varchar,
        smtpPort integer,
        smtpUsername varchar,
        smtpPassword varchar,
        jwtSecret varchar NOT NULL)`;

    return database.run(sqlQuery);
}

const setupConfigRow = (data) => {
    database.run('INSERT INTO config (jwtSecret) VALUES (?)', data);
}

createConfigTable();

const setSMTP = (data, cb) => {
    return database.run('UPDATE config SET smtpHost = ?, smtpPort = ?, smtpUsername = ?, smtpPassword = ?', data, (err, row) => {
        cb(err, row)
    });
}

const getConfig = (cb) => {
    return database.get('SELECT * FROM config', (err, row) => {
        cb(err, row)
    });
}

const getVariableList = (cb) => {
    return database.get('SELECT smtpHost, smtpPort, smtpUsername, smtpPassword FROM config', (err, row) => {
        cb(err, row)
    });
}

module.exports = {
    setSMTP,
    getConfig,
    setupConfigRow,
    getVariableList,
};