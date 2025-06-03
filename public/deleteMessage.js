const deleteMessageBtn = document.querySelectorAll(".delete-message-button");

deleteMessageBtn.forEach((deleteMessageButton) => {
    deleteMessageButton.addEventListener("click", async() => {
        const messageId = deleteMessageButton.dataset.messageid;
        
        const confirmed = confirm("Are you sure you want to delete this message?");
        if (!confirmed) return;

        await fetch(`/delete/${messageId}`, {
            method: "DELETE",
        })
        window.location.href = "/"
    })
});