const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const HistorySchema = new Schema({
    from: { type: String, required: true },
    bf: { type: Number, required: true },
    current: { type: Number, required: true },
    date: { type: Date, required: true },
    description: { type: String, required: false },
});

module.exports = mongoose.model('History', HistorySchema);