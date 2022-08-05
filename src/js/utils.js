const smoothScroll = (e) => {
    e.preventDefault();
    let anchor = e.target;
    let targetId = "#" + anchor.href.split("#")[1];
    document.querySelector(targetId).scrollIntoView({
        behavior: 'smooth'
    });
}

document.querySelector("#menu-button").onclick = () => {
    button.classList.toggle("toggled");
}