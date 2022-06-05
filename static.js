const fs = require("fs");

module.exports = function (request, response) {
  fs.readFile("./public" + request.url, function (err, data) {
    if (!err) {
      var dotoffset = request.url.lastIndexOf(".");

      var mimetype =
        dotoffset == -1
          ? "text/plain"
          : {
              ".html": "text/html",
              ".ico": "image/x-icon",
              ".jpg": "image/jpeg",
              ".png": "image/png",
              ".gif": "image/gif",
              ".css": "text/css",
              ".js": "text/javascript",
            }[request.url.substr(dotoffset)];

      response.setHeader("Content-type", mimetype);

      response.end(data);

    } else {
      console.log("file not found: " + request.url);
      response.writeHead(404, "Not Found");

      response.end();
    }
  });
};
