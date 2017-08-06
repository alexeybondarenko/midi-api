const Express = require('express');
const ejs = require('ejs');
const path = require('path');
const fs = require('fs');

const binaryServer = require('binaryjs').BinaryServer;

const app = new Express();

app.set('PORT', process.env.PORT || 3000);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));

app.use('/client', Express.static(path.join(__dirname, '../client')));
app.use('/modules', Express.static(path.join(__dirname, '../node_modules')));

app.get('/', (request, response) => {
  response.render('index');
});

const server = app.listen(app.get('PORT'), (error) => {
  if (error) {
    console.log('Server started with an error', error);
    process.exit(1);
  }
  console.log(`Server started and is listening at http://localhost:${app.get('PORT')}`);
});

const socket = new binaryServer({
  server: server,
  path: '/socket',
});

function playTone(tone, stream) {
  if (tone > 61 || tone < 1) {
    console.log('undefined tone', tone);
    return;
  }

  const file = fs.createReadStream(path.resolve(__dirname, 'wav', `${tone}.wav`));
  file.pipe(stream);
  file.on('end', () => {
    file.unpipe(stream);
  });

  return file;
}
socket.on('connection', (client) => {
  client.on('stream', (stream, meta) => {

    stream.on('data', (data) => {
      console.log(data);
      const tone = data.readInt8(1);
      Object.keys(socket.clients).map(i => playTone(tone, socket.clients[i].createStream()));
    });

    stream.on('end', () => {
      console.log('end of stream');
    });
  });
});
