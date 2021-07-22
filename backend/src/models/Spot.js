const mongoose = require('mongoose');

const SpotSchema = new mongoose.Schema({
    thumbnail: String,
    hospital: String,
    endereco: String,
    sangue:[String],

    //salvando o usuario criador do spot
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {// esse objeto passa a configuração para o mongoose, toda vez que os virtuals forem convertidos para JSON
    // os virtuals serão calculados juntos
    toJSON: {
        virtuals: true,

    },
});


//Virtual
//esse campo é computado pelo JavaScript, ele nao existe no banco

SpotSchema.virtual('thumbnail_url').get(function() {
    return `http://localhost:3333/files/${this.thumbnail}`
})
module.exports = mongoose.model('Spot', SpotSchema);