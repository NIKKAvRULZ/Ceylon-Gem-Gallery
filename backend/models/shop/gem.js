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

    cut: 
    { 
        type: String, 
        required: true
    },


    imageUrl: 
    { 
        type: String,
        required: true 

        
    },

    Shape: 
    { 
        type: String,
        required: true  
    },

    Facets:
    { 
        type: String,
        required: true 

    },

    Proportions:
    { 
        type: String,
        required: true 

    },

    Appearance: 
    { 
        type: String,
        required: true 

    },

    price:
    {
        type: Number, 
        required: true
    }

});

const gem = mongoose.model('Gem', gemSchema);

module.exports = gem;

