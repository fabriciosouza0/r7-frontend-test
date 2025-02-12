var app = require("connect")();
var serveStatic = require("serve-static");

app.use(serveStatic("public"));

// Allow CORS, i don't need to add more complexity for that(K.I.S.S)
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

app.listen(7007, () => {
  console.log(" ➜   Open: http://localhost:7007");
});
