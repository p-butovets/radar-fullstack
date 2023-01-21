const { Schema, model } = require('mongoose');

const schema = new Schema({
    login: { type: 'string', required: true, unique: true },
    password: { type: 'string', required: true },
    isAdmin: { type: 'boolean', default: false }
});

module.exports = model("User", schema)