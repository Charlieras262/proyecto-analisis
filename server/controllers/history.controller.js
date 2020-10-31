const History = require('../models/History');
const historyCTRL = {};

historyCTRL.getHistoriesAmount = async (req, res) => {
    const history = await History.find().countDocuments();
    res.json(history);
}

historyCTRL.getHistories = async (req, res) => {
    const histories = await History.aggregate(
        [
            {
                $group: {
                    _id: { $dateToString: { format: '%Y-%m-%d', date: "$date" } },
                    current: { $sum: {$subtract: ["$current", "$bf"]} },
                    date: {$first: "$date"}
                }
            },
            { "$sort": { "date": 1 } }
        ]
    )
    res.json(histories);
}

historyCTRL.getHistory = async (req, res) => {
    const history = await History.findById(req.params.id);
    res.json(history);
}

historyCTRL.createHistory = async (req, res) => {
    const history = new History(req.body);
    await history.save();
    res.json('historyCreated');
}

historyCTRL.editHistories = async (req, res) => {
    await History.findByIdAndUpdate(req.params.id, req.body);
    res.json('historyUpdated');
}

historyCTRL.deleteHistories = async (req, res) => {
    await History.findByIdAndDelete(req.params.id);
    res.json('historyDeleted');
}

module.exports = historyCTRL;