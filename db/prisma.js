const { PrismaClient } =  require("@prisma/client");
const path = require("path");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const fs = require("fs");
const { body, validationResult } = require("express-validator");

const validateUser = [
    body("firstName").trim()
        .isAlpha().withMessage("First name must only container letters.")
        .isLength({min: 1, max: 15}).withMessage("First name must be between 1 and 15 characters long"),
    body("lastName").trim()
        .isAlpha().withMessage("Last name must only container letters.")
        .isLength({min: 1, max: 15}).withMessage("Last name must be between 1 and 15 characters long"),
    body("username").trim()
        .isLength({min: 3, max: 15}).withMessage("Username must be between 3 and 15 characters long"),
    body("password").trim()
        .isLength({min: 8, max: 30}).withMessage("Password must be atleast 8 characters long"),
]

const postUserSignUp = [
    validateUser,
    async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty() || req.body.password !== req.body.confirmPassword) {
            const isPasswordMatching = req.body.password !== req.body.confirmPassword;
            if (isPasswordMatching) {
                res.render("signUp", {
                    title: "Sign Up",
                    errors: errors.array(),
                    passwordError: "Password is not matching"
                })
            } else {
                res.render("signUp", {
                    title: "Sign Up",
                    errors: errors.array(),
                    })
            }
        } else {
            try {
                const hashedPassword = await bcrypt.hash(req.body.password, 10);
                await prisma.user.create({
                    data: {
                        full_name: req.body.firstName + ' ' + req.body.lastName,
                        username: req.body.username,
                        password: hashedPassword,
                    }
                });
                res.redirect("/sign-in");
            } catch(error) {
                console.log(error);
                next(error);
            }
        }
    }
]

async function getUsers(userId) {
    try {
        const currentUser = await prisma.user.findUnique({
            where: {
                id: userId
            },
            select: {
                friends: {
                    select: {
                        id: true
                    }
                }
            }
        });


        const friendId = currentUser.friends.map(friend => friend.id);


        const rows = await prisma.user.findMany({
            where: {
                id: {
                    notIn: [userId, ...friendId]
                },
            }
        });


        return rows
    } catch (err) {
        console.log(err);
    }
}

async function getFriends(userId) {
    try {
        const rows = await prisma.user.findUnique({
            where: {
                id: userId
            }, select: {
                friends: true,
            }, 
        })
        return rows
    }catch(err) {
        console.log(err)
    };
}

async function findFriend(friendId) {
    try {
        const rows = prisma.user.findUnique({
            where: {
                id: friendId,
            }
        })
        return rows;
    } catch (err) {
        console.log(err)
    }
}

async function getMessages() {
    try {
        const rows = await prisma.message.findMany({
            include: {
                author: true,
            }
        });
        return rows;
    } catch(error) {
        console.log(error);
    } 
}

async function postMessage(req, res) {
   try {
        const message = req.body.newMessage;
        const userId = req.user.id;
        await prisma.message.create({
            data: {
                text: message,
                date: new Date(),
                authorId: userId,
            }
        })
        res.redirect("/");
       
    }  catch (error) {
        console.log(error)}
}

async function getFolders(currentFolder) {
    try {
       if (currentFolder == null) {
            const rows = await prisma.folder.findMany( {
                where: {
                    parentFolderId: null,
                },
                orderBy: {
                    folder_name: "asc",
                }
            });
            return rows;
        } else {
            const rows = await prisma.folder.findMany({
                where: {
                    parentFolderId: currentFolder,
                },
                orderBy: {
                    folder_name: "asc",
                }
            });
            return rows;
        }
    } catch(error) {
        console.log(error);
    } 
}

async function postFolder(req, res) {
    try {
        const folder = req.body.newFolderName;
        const userId = req.user.id;
        let parentFolderId = parseInt(req.params.folder);
        await prisma.folder.create({
            data: {
                folder_name: folder,
                date: new Date(),
                folderAuthorId: userId,
                parentFolderId: parentFolderId,
                type: "folder",
        }
        })
        res.redirect(`/upload`);
    } catch (err) {
            console.log(err)
        } 
}

async function postFile(req, res) {
    try {
        const folder = req.file.originalname;
        const userId = req.user.id;
        const size = req.file.size / (1024 * 1024)
        let parentFolderId = parseInt(req.params.folder);
        await prisma.folder.create({
            data: {
                folder_name: folder,
                date: new Date(),
                folderAuthorId: userId,
                parentFolderId: parentFolderId,
                type: "file",
                size: size.toString(),
                download_name: req.uploadTime + '--' + folder,
        }
        })
        res.redirect(`/upload`);
    } catch (err) {
            console.log(err)
        } 
}

async function editFile(req, res) {
    try {
        const fileId = parseInt(req.params.fileForEditing);
        const newName = req.body.editedFolder;
        await prisma.folder.update({
        where: {
            id: fileId,
        },
        data: {
            folder_name: newName,
        }
        })
        res.redirect("/upload")
    } catch (err) {
        console.log(err);
    }
    
}

async function deleteFile(fileId) {
    
    try {
        const fileToDelete = await prisma.folder.findUnique({
            where: {
                id: fileId
            }
        })
        await prisma.folder.delete({
            where: {
                id: fileId,
            }
        })

        
        
        try {
            const pathName = path.join(__dirname, "..","files",fileToDelete.download_name)
            await fs.promises.unlink(pathName)
        } catch (err) {
            console.log(err);
        }
        
    } catch (err) {
        console.log(err);
    }
}

async function deleteMessage(messageId) {
    try {
        await prisma.message.delete({
            where: {
                id: messageId,
            }
        })
    } catch (err) {
        console.log(err)
    }
}

async function addFriend(friendId, userId) {
    await prisma.user.update({
        where: {
            id: userId,
        },
        data: {
            friends: {
                connect: {
                    id: friendId,
                }
            }
        }
    });
}

async function postChat(currentUser, reciever, chatText) {
    try {
        await prisma.chat.create({
        data: {
            currentUser: currentUser,
            recievingUser: reciever,
            chatContent: {
            create: [
                {
                senderId: currentUser,
                content: chatText,
                timestamp: new Date(), 
                }
            ]
            }
        }
     });
    }catch (err) {
        console.log(err)
    }
}

async function getChat(currentUser, friendId) {
    try {
        const rows = await prisma.chat.findMany({
            where: {
                OR: [
                    {
                        currentUser: currentUser,
                        recievingUser: friendId,

                    },
                    {
                        currentUser: friendId,
                        recievingUser: currentUser,
                    }
                ],
            }, include: {
                chatContent: true,
            }
        })
        return rows;
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    postUserSignUp,
    getMessages,
    postMessage,
    getFolders,
    postFolder,
    postFile,
    editFile,
    deleteFile,
    deleteMessage,
    getUsers,
    addFriend,
    getFriends,
    findFriend,
    postChat,
    getChat,
}