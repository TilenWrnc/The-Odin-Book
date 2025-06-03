const query = require("../db/prisma");
const { all } = require("./uploadFileRoute");

async function getIndex(req, res) {
    const messages = await query.getMessages();
    const formattedMessages = messages.map(msg => ({
      ...msg,
      formattedDate: msg.date.toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }),
    }));

    let suggestedUsers = null;
    let userFriends = null;

    if (req.user != null) {
      suggestedUsers = await query.getUsers(req.user.id);
      userFriends = await query.getFriends(req.user.id)
    }

    res.render("index", {title: "index page", user: req.user, messages: formattedMessages, suggestedUsers: suggestedUsers, userFriends: userFriends});
}

async function addFriend(req, res) {
  const userId = parseInt(req.user.id);
  const friendId = parseInt(req.params.friendId);

  await query.addFriend(friendId, userId);
  res.redirect("/");
}

module.exports = {
    getIndex,
    addFriend,
}