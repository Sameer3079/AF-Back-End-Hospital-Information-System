const Express                               = require('express');
const BodyParser                            = require('body-parser');
const Routes                                = require('./Routes');
const Cors                                  = require('cors');

const app = Express();

app.use(Cors());
app.use(BodyParser.urlencoded({extended:false}));
app.use(BodyParser.json());
app.use('/', Routes);

app.listen(3001, 'localhost', (err) => {
    if(err){
        console.log(err);
        process.exit(-1);
    }
    console.log('server running port 3001');
});