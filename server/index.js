const Express = require('express');
const ejs = require('ejs');
const path = require('path');

const app = new Express();

app.set('PORT', process.env.PORT || 3000);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));

app.use('/client', Express.static(path.join(__dirname, '../client')));
app.use('/modules', Express.static(path.join(__dirname, '../node_modules')));

app.get('/', (request, response) => {
  response.render('index');
});

app.listen(app.get('PORT'), (error) => {
  if (error) {
    console.log('Server started with an error', error);
    process.exit(1);
  }
  console.log(`Server started and is listening at http://localhost:${app.get('PORT')}`);
})
