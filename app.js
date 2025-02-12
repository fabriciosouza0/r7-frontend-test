var app = require("connect")();
var serveStatic = require("serve-static");

// Allow CORS, i don't need to add more complexity for that(K.I.S.S)
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");

  // Response for OPTIONS request
  if (res.method === "OPTIONS") {
    res.end();
    return;
  }

  next();
});

app.use(serveStatic("public"));

app.listen(7007, () => {
  console.log(" ➜   Open: http://localhost:7007");
});
