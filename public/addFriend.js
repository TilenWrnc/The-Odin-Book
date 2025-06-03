const addFriendBtn = document.querySelectorAll(".add-friend-button");

addFriendBtn.forEach((addFriendButton) => {
    addFriendButton.addEventListener("click", async() => {
        const suggestedUserId = addFriendButton.dataset.suggesteduserid;
        console.log(suggestedUserId)
        

        await fetch(`/add-friend/${suggestedUserId}`, {
            method: "POST",
        })
     
        window.location.href = "/"

    })
})