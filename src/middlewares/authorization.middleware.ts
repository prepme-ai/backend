const firebaseAdmin = require('firebase-admin');
module.exports = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]; //Bearer eysaddasf

    if (token) {
        firebaseAdmin
            .auth()
            .verifyIdToken(token)
            .then((decodedToken) => {
                req.user = decodedToken;
                next();
            })
            .catch((error) => {
                console.log(error);
                res.status(401).json({ message: 'Auth failed' });
            });
    } else {
        console.log(token);
        res.status(401).json({ message: 'Auth failed' });
    }
};
