const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/User');

const protect = asyncHandler(async (req, res, next) => {
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            // Le token est sous la forme "Bearer <token>", on prend la 2ème partie
            token = req.headers.authorization.split(' ')[1];

            // Décoder le token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Ajouter l'utilisateur à la requête (sans le mot de passe)
            req.user = await User.findById(decoded.id).select('-password');

            next();
        } catch (error) {
            console.error(error);
            res.status(401);
            throw new Error('Non autorisé, token invalide');
        }
    }

    if (!token) {
        res.status(401);
        throw new Error('Non autorisé, aucun token fourni');
    }
});

module.exports = { protect };