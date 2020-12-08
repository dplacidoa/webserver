const express = require('express');
const app = express();

const hbs = require('hbs');
//helpers
require('./hbs/helpers/helpers')

const port = 80;

app.use(express.static(__dirname + '/public'))

//Express HBS engine
hbs.registerPartials(__dirname + '/views/parciales')
app.set('view engine', 'hbs');

app.get('/', (req, res) => {

    res.render('home', {
        nombre: 'entelgy'
    });

});

app.get('/about', (req, res) => {

    res.render('about');

})

app.listen(port, () => {
    console.log(`Escuchando peticiones en el puerto ${port}`);
});