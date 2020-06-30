module.exports = {

    getUserPosts: (req, res) => {
        const db = req.app.get('db');

        db.get_user_posts().then(posts => res.status(500).send(posts))
    }
}