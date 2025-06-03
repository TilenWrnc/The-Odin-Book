const downloadBtn = document.querySelectorAll(".download-button");
const deleteFolderBtn = document.querySelectorAll(".delete-button");

deleteFolderBtn.forEach((deleteFolderButton) => {
    deleteFolderButton.addEventListener("click", async() => {
        const fileId = deleteFolderButton.dataset.fileid;
        
        const confirmed = confirm("Are you sure you want to delete this folder and it's content?");
        if (!confirmed) return;

        const res = await fetch(`/upload/delete/${fileId}`, {
            method: "DELETE",
        })

        location.reload();
    })
});

downloadBtn.forEach((downloadButton) => {
    downloadButton.addEventListener("click", async() => {
        const fileToDownload = downloadButton.dataset.downloadname;
        console.log(fileToDownload)

        window.location.href = `/upload/download/${fileToDownload}`;
    })
})





