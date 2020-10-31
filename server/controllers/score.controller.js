const Score = require('../models/Score');
const ScoreController = {};

ScoreController.getScores = async (req, res) => {
    const score = await Score.find();
    if (score.lenght === 0) {
        return res.json({ success: false, msg: 'Scores not found' })
    } else {
        return res.json(score);
    }
}

ScoreController.getScore = async (req, res) => {
    const score = await Score.findById(req.params.id);
    if (!score) {
        return res.json({ success: false, msg: 'Scores not found' })
    } else {
        return res.json(score);
    }
}

ScoreController.createScore = async (req, res) => {
    const score = new Score(req.body);
    if(!score.p1){
        score.p1 = "NNI";
    }
    if(!score.p2){
        score.p2 = "NNI";
    }
    if(!score.z){
        score.z = "NNI";
    }
    if(!score.fe){
        score.fe = "NNI";
    }
    await score.save();
    res.json({
        status: 'Score created'
    });
}


ScoreController.updateScore = async (req, res) => {
    const score = new Score(req.body);
    await Score.findByIdAndUpdate(req.params.id, score);
    res.json({
        status: 'Score Updated'
    });
}

ScoreController.deleteScore = async (req, res) => {
    await Score.findByIdAndDelete(req.params.id);
    res.json({
        status: 'Score Deleted'
    });
}

module.exports = ScoreController;