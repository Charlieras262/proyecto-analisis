const Institution = require('../models/Institution');
const History = require('../models/History');
const institutionCTRL = {};

institutionCTRL.getInstitutionsAmount = async (req, res) => {
    const institution = await Institution.find().countDocuments();
    res.json(institution);
}

institutionCTRL.getInstitutions = async (req, res) => {
    const institution = await Institution.find();
    res.json(institution);
}

institutionCTRL.getInstitution = async (req, res) => {
    const institution = await Institution.findById(req.params.id);
    res.json(institution);
}

institutionCTRL.createInstitution = async (req, res) => {
    const institution = new Institution(req.body);
    const bf = await Institution.find().countDocuments()
    const history = new History({ from: 'dashboard_su.inst', bf, current: bf + 1, date: Date(), description: '' });
    await history.save()
    await institution.save();
    res.json('instCreated');
}

institutionCTRL.editInstitutions = async (req, res) => {
    await Institution.findByIdAndUpdate(req.params.id, req.body);
    res.json('instUpdated');
}

institutionCTRL.deleteInstitutions = async (req, res) => {
    const bf = await Institution.find().countDocuments()
    await Institution.findByIdAndDelete(req.params.id);
    const history = new History({ from: 'dashboard_su.inst', bf, current: bf - 1, date: Date(), description: '' });
    await history.save()
    res.json('instDeleted');
}

institutionCTRL.authInstitutionInfo = (req, res) => {
    var institution = JSON.parse(req.params.id);
    var code, name;
    code = isFilled(institution.code, 'Code');
    name = isFilled(institution.name, 'Name');
    if (code.success && name.success) {
        Institution.getInstitutionbyCode(institution.code, (err, c) => {
            if (err) throw err;
            if (c) {
                code = { success: false, msg: 'Institution code found, Please enter a institution code valid (unused).' };
                if (c.name == institution.name) {
                    name = { success: false, msg: 'Institution name found, Please enter a institution name valid (unused).' }
                }
            }
            res.json({ code: code, name: name });
        });
    } else {
        res.json({ code: code, name: name });
    }
}

var isFilled = (data, nameFiel) => {
    if (data == undefined || data == ' ' || data == '') {
        return { success: false, msg: 'The field "' + nameFiel + '" is empty' };
    } else {
        return { success: true, msg: 'The field is filled' };
    }
}

module.exports = institutionCTRL;