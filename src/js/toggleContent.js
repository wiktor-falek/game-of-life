const toggleContent = () => {
    let visibleElements = document.querySelectorAll(".hide-toggle__visible");
    let hiddenElements = document.querySelectorAll(".hide-toggle__hidden");

    for (let el of visibleElements) {
        el.classList.remove("hide-toggle__visible");
        el.classList.add("hide-toggle__hidden");
    }
    for (let el of hiddenElements) {
        el.classList.remove("hide-toggle__hidden");
        el.classList.add("hide-toggle__visible");
    }

    let headers = document.querySelectorAll("header")
    headers.forEach((header) => {
        let headerDisplay = window.getComputedStyle(header).display;
        
        if (headerDisplay === "none") {
            header.style.display = "flex";
        }
        else if (headerDisplay === "flex") {
            header.style.display = "none";
        }
    });

    let tiles = document.querySelector(".tiles");
    let zIndex = window.getComputedStyle(tiles).zIndex;
    tiles.style.zIndex = zIndex * -1; // flip between -1 and 1

}
