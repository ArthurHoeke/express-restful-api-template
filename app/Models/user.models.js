const tableName = "user";

const createTable = () => {
    const columns = [
        { name: 'id', type: 'integer PRIMARY KEY AUTOINCREMENT' },
        { name: 'email', type: 'varchar UNIQUE' },
        { name: 'password', type: 'varchar' },
        { name: 'role', type: 'integer' }
    ];

    const columnDefinitions = columns.map(col => `${col.name} ${col.type}`).join(', ');

    const sqlQuery = `CREATE TABLE IF NOT EXISTS ${tableName} (${columnDefinitions})`;

    return database.run(sqlQuery);
}


createTable();

const create = (data, cb) => {
    return database.run(`INSERT INTO ${tableName} (email, password, role) VALUES (?,?,?)`, data, (err) => {
        cb(err)
    });
}

const getUserCount = (cb) => {
    return database.get(`SELECT COUNT(*) AS userCount FROM ${tableName}`, (err, row) => {
        cb(err, row)
    });
}

const getUserIdByEmail = (data, cb) => {
    return database.get(`SELECT id FROM ${tableName} WHERE email = ?`, data, (err, row) => {
        cb(err, row)
    });
}

const getUserEmailById = (data, cb) => {
    return database.get(`SELECT email FROM ${tableName} WHERE id = ?`, data, (err, row) => {
        cb(err, row)
    });
}

const getUserDataByEmail = (data, cb) => {
    return database.get(`SELECT id, password, role FROM ${tableName} WHERE email = ?`, data, (err, row) => {
        cb(err, row)
    });
}

module.exports = {
    create,
    getUserDataByEmail,
    getUserCount,
    getUserIdByEmail,
    getUserEmailById
};
