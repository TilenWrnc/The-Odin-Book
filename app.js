const path = require("node:path")
const express = require("express");
const session = require("express-session");
const passport = require("passport");
const query = require("./db/prisma")
const initializePassport = require("./auth/passwordConfig")

const app = express();
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

const assetsPath = path.join(__dirname, "public");
app.use(express.static(assetsPath));

app.use(session({ secret: "cats", resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));

initializePassport(passport);

// INDEX ROUTE AND ADDING FRIENDS

const indexRoute = require("./routes/indexRoute");

app.get("/", indexRoute.getIndex);
app.post("/add-friend/:friendId", indexRoute.addFriend);

// ROUTES FOR SIGNING IN AND MAKING A NEW ACCOUNT AND ALSO LOGGING 

const auth = require("./routes/authRoute");
app.get("/sign-up", auth.signUp);

const { postUserSignUp } = require('./db/prisma');
app.post("/sign-up", postUserSignUp)

app.get("/sign-in", auth.signin);
app.post("/sign-in",
    passport.authenticate("local", {
      successRedirect: "/",
      failureRedirect: "/sign-in"
    })
);
app.get("/log-out", (req, res, next) => {
    req.logout((err) => {
      if (err) {
        return next(err);
      }
      res.redirect("/");
    });
});

// CREATE NEW MESSAGE AND DELETE MESSAGE ROUTE

const createMessageRoute = require("./routes/createMessageRoute")

app.get("/new-message", createMessageRoute.createMessage)
app.post("/new-message", query.postMessage)
app.delete("/delete/:message", async (req, res) => {
  const messageId = parseInt(req.params.message);
  
  query.deleteMessage(messageId);
  res.redirect("/")
})

// UPLOAD AND EDIT FILES ROUTE

const fileRouter = require("./routes/uploadFileRoute")

app.use("/upload", fileRouter);

// CHAT ROUTE

const chatRouter = require("./routes/chatRoute")
app.use("/chat", chatRouter)


app.listen(3000, () => console.log("app listening to port 3000!"));