const Asignation = require('../models/Asignation');
const asignationCTRL = {};

asignationCTRL.getAsignations = async (req, res) => {
    const asignation = await Asignation.find().populate({path: 'account_code'});
    res.json(asignation);
};

asignationCTRL.getAsignation = async (req, res) => {
    const asignation = await Asignation.findById(req.params.id).populate({path: 'account_code'});
    res.json(asignation);
};

asignationCTRL.createAsignation = async (req, res) => {
    const asignation = new Asignation(req.body)
    asignation.save();
    res.json({ success: true, msg: 'assignAdded' });
};

asignationCTRL.editAsignation = async (req, res) => {
    await Asignation.findByIdAndUpdate(req.params.id, req.body);
    res.json({
        status: 'Asignation Updated'
    });
};

asignationCTRL.deleteAsignation = async (req, res) => {
    await Asignation.findByIdAndDelete(req.params.id);
    res.json({ success: true, msg: 'assignDeleted' });
};

module.exports = asignationCTRL;