const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RecipeSchema = new Schema({
    _id: {
        type: String
    },
    calories: {
        type: Number,
        required: [true, 'Number of calories is required']
    },
    ingredients: {
        type: Array
    },
    preparation: {
        type: String
    },
    vegetarian: {
        type: Boolean,
        default: false
    }
});

const Recipe = mongoose.model('recipe', RecipeSchema);

module.exports = Recipe;