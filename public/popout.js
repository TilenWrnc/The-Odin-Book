const addFileButton = document.querySelector(".add-file-button");
const addFolderButton = document.querySelector(".add-folder-button");

const addFilePopup = document.querySelector(".upload-container");
const addFolderPopup = document.querySelector(".new-folder-container");

const exitFilePopout = document.querySelector(".exit-file-popout")
const exitFolderPopout = document.querySelector(".exit-folder-popout")

const body = document.querySelector('.folder-all'); 

addFileButton.addEventListener("click", () => {
    body.style.pointerEvents = "none"; 
    addFilePopup.style.opacity = "1";
    addFilePopup.style.pointerEvents = "all";
});

addFolderButton.addEventListener("click", () => {
    body.style.pointerEvents = "none"; 
    addFolderPopup.style.opacity = "1";
    addFolderPopup.style.pointerEvents = "all";
});

exitFilePopout.addEventListener("click", () => {
    addFilePopup.style.opacity = "0";
    addFilePopup.style.pointerEvents = "none";
    body.style.pointerEvents = "all";
});

exitFolderPopout.addEventListener("click", () => {
    addFolderPopup.style.opacity = "0";
    addFolderPopup.style.pointerEvents = "none";
    body.style.pointerEvents = "all";
});
