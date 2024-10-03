const mongoose = require('mongoose');

const gemSchema = new mongoose.Schema({
  
    name: 
    { 
        type: String, 
        required: true 
    },

    description: 
    { 
        type: String, 
        required: true
    },

    imageUrl: 
    { 
        type: String 
    },

    Shape: 
    { 
        type: String 
    },

    Facets:
    { 
        type: String
    },

    Proportions:
    { 
        type: String
    },

    Appearance: 
    { 
        type: String
    },

    price:
    {
        type: Number, 
        required: true
    }

});

const gem = mongoose.model('Gem', gemSchema);

module.exports = gem;

