var http = require('http');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var spawn = require('child_process').spawn;

var app = express();


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const pie_url = "http://10.0.0.11:8080/";
var publicDir = path.join(__dirname, 'public');

console.log(__dirname);

app.get('/', function (req, res) {
  console.log("sending index");
  res.sendFile(path.join(publicDir, 'home.html'));
});

app.get('/selectpie/:url',function (req, res, next) {
  let goto_url = pie_url+req.params.url;

  console.log("selecting clock ", goto_url);

  var prc = spawn(__dirname+'/run_firefox.sh',  [goto_url]);

  prc.stdout.setEncoding('utf8');
  prc.stdout.on('data', function (data) {
  })
  prc.on('close', function (code) {
  });
  res.sendFile(path.join(publicDir, 'done.html'));

});


app.get('/toggle_display', function (req, res) {
  var prc = spawn(__dirname+'/toggle_display.sh',  ['0']);

  prc.stdout.setEncoding('utf8');
  prc.stdout.on('data', function (data) {
  })
  prc.on('close', function (code) {
  });
  res.sendFile(path.join(publicDir, 'done.html'));
});


app.get('/info/:type',function (req, res, next) {
  console.log("sending info type", req.params.type);
  let arguements = null;

  switch (req.params.type) {
    case "d":
      console.log("getting disk info");
      arguements = "-d";
      break;
    case "c":
      console.log("getting temperature info");
      arguements = "-c";
      break;
    case "t":
      console.log("getting top info");
      arguements = "-t";
      break;
    case "a":
      console.log("getting all info");
      arguements = "-a";
      break
  }

  if(arguements!== null){
    var prc = spawn(__dirname+'/info_script.sh',  [arguements]);
    let output = "";
    //noinspection JSUnresolvedFunction
    prc.stdout.setEncoding('utf8');
    prc.stdout.on('data', function (data) {
      var str = data.toString()

      var lines = str.split(/(\r?\n)/g).join("");
      output+=lines;
    })
    prc.on('close', function (code) {
      //console.log(output);
      return res.json({result:output});
    });


  }else{
    return res.json({result:"failed to get"});
  }
});

app.get('/reboot', function (req, res) {
  var prc = spawn('reboot',  []);

  prc.stdout.setEncoding('utf8');
  prc.stdout.on('data', function (data) {
  })
  prc.on('close', function (code) {
  });
  res.sendFile(path.join(publicDir, 'done.html'));
});

app.get('/shutdown', function (req, res) {
  var prc = spawn('shutdown',  ['now']);

  prc.stdout.setEncoding('utf8');
  prc.stdout.on('data', function (data) {
  })
  prc.on('close', function (code) {
  });
  res.sendFile(path.join(publicDir, 'done.html'));
});


app.use(function(req, res) {
  if(req.error){
    console.log("error encountered");
  }
  console.log("not found1 ", req.url);
  res.statusCode = 404;
  return res.send("not found");
});





var port = normalizePort(process.env.PORT || '8080');
app.set('port', port);

var server = http.createServer(app);

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
      ? 'Pipe ' + port
      : 'Port ' + port;

  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
      ? 'pipe ' + addr
      : 'port ' + addr.port;
  console.log('Listening on ' + bind);
}
