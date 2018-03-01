const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next) => {
// next exists so you can tell express when your middleware function is done and its useful bcoz u can have as much middleware as you like registered to a single express app.the app is not gonna move on until next();
var now = new Date().toString();
var log = `${now}: ${req.method} ${req.url}`;

console.log(log);
fs.appendFile('server.log', log + '\n', (err) => {
   if(err){
      console.log('Unable to append');
    }
});
next();

});

// app.use((req, res, next) => {
//   res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear',() => {
  return new Date().getFullYear()
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
});

app.get('/', (req, res) => {
  // res.send('<h1>hello express</h1>');
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome to our website'
  });
});
//this is gonna let us setup a handler for a http get request

app.get('/about', (req, res) => {
    // res.send('About page');
    res.render('about.hbs', {
      pageTitle: 'About page'
    });
});

app.get('/projects', (req,res) => {
    res.render('projects.hbs', {
      pageTitle: 'Projects'
    });
});

app.get('/bad',(req, res) => {
    res.send({
      errorMessage : 'unable to fullfill request'
    });
});

// app.listen(3000, () => {
//     console.log('server is up on port 3000');
// });
app.listen(port, () => {
      console.log(`server is up to port ${port}`);
});
