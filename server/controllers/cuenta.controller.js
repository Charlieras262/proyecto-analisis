const Cuenta = require('../models/Cuenta');
const User = require('../models/User');
const Validations = require('./validations/general.validation');
const cuentaCTRL = {};

cuentaCTRL.getCuentas = async (req, res) => {
    await Cuenta.find((err, cuenta) => {
        if (err) throw err;
        if (!cuenta) {
            return res.json({ success: false, msg: 'Term not found' })
        } else {
            return res.json(cuenta);
        }
    });
}

cuentaCTRL.getCuenta = async (req, res) => {
    const cuenta = await Cuenta.findById(req.params.id);
    if (!cuenta) {
        return res.json({ success: false, msg: 'Term not found' })
    } else {
        return res.json(cuenta);
    }
}

cuentaCTRL.createCuenta = async (req, res) => {
    const cuenta = new Cuenta({
        _id: req.body._id,
        name: req.body.name,
        naturaleza: req.body.naturaleza,
        tipo: req.body.tipo
    });
    await cuenta.save()
    res.json('student.created');
}

cuentaCTRL.editCuenta = async (req, res) => {
    await Cuenta.findByIdAndUpdate(req.params.id, req.body);
    res.json({
        msg: 'stuUpdated',
        success: true
    });
}

cuentaCTRL.deleteCuenta = async (req, res) => {
    await Cuenta.findByIdAndRemove(req.params.id);
    res.json({
        msg: 'stuDeleted',
        success: true
    });
}

module.exports = cuentaCTRL;