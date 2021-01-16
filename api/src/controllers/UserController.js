const User = require('../database/models/Users');

module.exports = {
    async store(req, res){
        const {name, password, mail} = req.body;

        const user = await User.create({ name, password, mail });

        return res.json(user);
    }
}