//index, show, store, update, destroy

const User = require('../models/User')
module.exports = {
    async store(req, res) {
        const {email} = req.body;
        
        //verificação de usuario, caso o email não seja encontrado, ele irá criar um novo usuário
        let user = await User.findOne({ email });

        if(!user) {
            user = await User.create({ email });
        }

        

        return res.json(user);

    }
};