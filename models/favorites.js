const mongoose = require('mongoose')
const schema = mongoose.Schema;

const favoritesSchema = new schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    favorites: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Dish'
    }
]
});

module.exports = mongoose.model('Favorite',favoritesSchema);