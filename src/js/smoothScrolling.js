const smoothScroll = (e) => {
    console.log('XD')
    e.preventDefault();
    console.log(e)
    let anchor = e.target;

    console.log(anchor.href)
    //document.querySelector('.your_class or #id here').scrollIntoView({
    //    behavior: 'smooth'
    //});
}