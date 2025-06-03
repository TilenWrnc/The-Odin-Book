const query = require("../db/prisma")
const { Router } = require("express");

const chatRouter = Router();

chatRouter.get("/:friend", async (req, res) => {

    const friendId = parseInt(req.params.friend);
    const currentUser = req.user.id;

    const friend = await query.findFriend(friendId);

    const chat = await query.getChat(currentUser, friendId);
    
    const formattedChat = chat.map(chat => ({
    ...chat,
    chatContent: chat.chatContent.map(msg => {
        const date = new Date(msg.timestamp);
        return {
        ...msg,
        formattedDate: date.toLocaleDateString('en-GB'),
        formattedTime: date.toLocaleTimeString('en-GB', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false
        }),
        };
    }),
    }));

    res.render("chat", {
        title: "Chat",
        user: req.user,
        friend: friend,
        chat: formattedChat,
    })
})

chatRouter.post("/:friend", async(req, res) => {
    const currentUser = req.user.id;
    const reciever = parseInt(req.params.friend);
    const chatText = req.body.chatText;

    await query.postChat(currentUser, reciever, chatText);
    res.redirect(`/chat/${reciever}`)
});

module.exports = chatRouter;