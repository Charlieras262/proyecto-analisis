const Pensum = require('../models/Pensum');
const PensumController = {};

PensumController.getPensums = async (req, res) => {
    await Pensum.find().populate({
        populate: {
            path: 'unities',
            populate: {
                path: 'subjects',
            }
        }
    }).exec((err, pensum) => {
        if (err) throw err;
        if (!pensum) {
            return res.json({ success: false, msg: 'Pensums not found' })
        } else {
            return res.json(pensum);
        }
    });
}

PensumController.getPensum = async (req, res) => {
    const pensum = await Pensum.findById(req.params.id).populate({
        populate: {
            path: 'unities',
            populate: {
                path: 'subjects',
            }
        }
    });
    res.json(pensum);
}

PensumController.createPensum = async (req, res) => {
    const pensum = new Pensum(req.body);
    await pensum.save();
    res.json({
        status: 'Pensum created'
    });
}


PensumController.updatePensum = async (req, res) => {
    const pensum = new Pensum(req.body);
    await Pensum.findByIdAndUpdate(req.params.id, pensum);
    res.json({
        status: 'Pensum Updated'
    });
}

PensumController.deletePensum = async (req, res) => {
    await Pensum.findByIdAndDelete(req.params.id);
    res.json({
        status: 'Pensum Deleted'
    });
}

module.exports = PensumController;