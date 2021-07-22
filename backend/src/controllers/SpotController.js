const Spot = require('../models/Spot');
const User = require('../models/User');



module.exports = {
    async index(req, res) {
        const { sangue } = req.query;

        const spots = await Spot.find({ sangue: sangue});

        return res.json(spots)
    },

    async store(req, res) {
        const { filename } = req.file;
        const { hospital, endereco, sangue } = req.body;
        const { user_id } = req.headers;

        const user = await User.findById(user_id);

        if(!user) {
            return res.status(400).json({ error: 'usuario nao existe' })
        }

        const spot = await Spot.create({
            user: user_id,
            thumbnail: filename,
            hospital,
            endereco,
            sangue: sangue.split(',').map(tipo => sangue.trim()),

        })

        return res.json(spot);
    }
}