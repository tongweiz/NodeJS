let http = require('http');
let fs = require('fs');
let path = require('path');
let mime = require('mime');
let cache = {};

// Help functions
function send404(response) {
  response.writeHead(404, { 'Context-Type': 'text/plain' });
  response.write('Error 404: resource not found');
  response.end();
}

function sendFile(response, filePath, fileContents) {
  response.writeHead(
    200,
    { "content-type": mime.lookup(path.basename(filePath)) }
  );
  response.end(fileContents);
}

function serveStatic(response, cache, absPath) {
  if (cache[absPath]) {
    sendFile(response, absPath, cache[absPath]);
  }
  else {
    fs.readFile(absPath, function(error, data) {
      if (error) {
        send404(response);
      }
      else {
        cache[absPath] = data;
        sendFile(response, absPath, data);
      }
    });
  }
}

// HTTP Server Code
let server = http.createServer(function(request, response) {
  let filePaht = false;
  if (request.url == '/') { 
    filePath = 'public/index.html';
  }
  else {
    filePath = 'public' + request.url;
  }
  let absPath = './' + filePath;
  serveStatic(response, cache, absPath);
});

server.listen(3000, function () {
  console.log("Server listening on port 3000.");
});

// Chat Server Code
let chatServer = require('./lib/chat_server');
chatServer.listen(server);