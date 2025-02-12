var app = require("connect")();
var serveStatic = require("serve-static");

app.use(serveStatic("public"));

app.listen(7007, () => {
  console.log(" ➜   Open: http://localhost:7007");
});
