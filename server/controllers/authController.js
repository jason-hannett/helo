const bcrypt = require('bcryptjs')

module.exports = {
        register: async(req, res) => {
            const {username, password} = req.body;
            const db = req.app.get('db');

            let foundUser = await db.auth.check_users(username);
            if(foundUser[0]){
                return res.status(400).send('Username already exists')
        }

            let salt = bcrypt.genSaltSync(10);
            let hash = bcrypt.hashSync(password, salt);
            let newUser = await db.auth.register_user({username, password: hash});

            req.session.user = newUser[0];
            res.status(201).send(req.session.user);
    },
    
    login: async(req, res) => {
        const {username, password} = req.body;
        const db = req.app.get('db');

        let foundUser = await db.auth.check_users(username);
        if(!foundUser[0]){
            return res.status(400).send("Username doesn't exist")
        }

        const authenticated = bcrypt.compareSync(password, foundUser[0].password);
        if(!authenticated){
            return res.status(400).send('Password is incorrect')
        }

        delete foundUser[0].password;
        req.session.user = foundUser[0];
        // console.log(req.session.user);
        res.status(202).send(req.session.user);
    },

    logout: (req, res) => {
        req.session.destroy();
        // console.log(req.session);
        res.sendStatus(200);
    }
}