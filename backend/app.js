const express = require('express');
const app = express();

app.use((req, res) => {
    res.json({message: 'Votre requête a été reçue !'})
});

const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://maxime:aRC8fTL436CUZ4js@testmongo.tr8izuc.mongodb.net/?retryWrites=true&w=majority',
/* {
    useNewUrlParser: true,
    useUnifiedTopology: true,
} */
)
.then(() => console.log('Connexion à la base MongoDb réussie'))
.catch(err => console.log(err))

module.exports = app;