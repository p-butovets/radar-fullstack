const { Schema, model } = require('mongoose');

const schema = new Schema({
    login: { type: 'string', required: true, unique: true },
    password: { type: 'string', required: true }
});

module.exports = model("User", schema)