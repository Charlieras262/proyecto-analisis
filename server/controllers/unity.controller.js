const Unity = require('../models/Unity');
const UnityController = {};

UnityController.getUnitys = async (req, res) => {
    await Unity.find().populate('subjects').exec((err, unity) => {
        if (err) throw err;
        if (!unity) {
            return res.json({ success: false, msg: 'Unitys not found' })
        } else {
            return res.json(unity);
        }
    });
}

UnityController.getUnity = async (req, res) => {
    const unity = await Unity.findById(req.params.id).populate('subjects');
    res.json(unity);
}

UnityController.createUnity = async (req, res) => {
    const unity = new Unity(req.body);
    await unity.save();
    res.json({
        status: 'Unity created'
    });
}


UnityController.updateUnity = async (req, res) => {
    const unity = new Unity(req.body);
    await Unity.findByIdAndUpdate(req.params.id, unity);
    res.json({
        status: 'Unity Updated'
    });
}

UnityController.deleteUnity = async (req, res) => {
    await Unity.findByIdAndDelete(req.params.id);
    res.json({
        status: 'Unity Deleted'
    });
}

module.exports = UnityController;