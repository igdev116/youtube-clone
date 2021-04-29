function dragSlider() {
    let tagsCtn = document.querySelector('.tags'); // get element of tags container
    let isDown = false;
    let startX;
    let scrollLeft;
    
    tagsCtn.addEventListener('mousedown', (e) => {
        isDown = true;
        startX = e.pageX - tagsCtn.offsetLeft;
        scrollLeft = tagsCtn.scrollLeft;
    })
    
    tagsCtn.addEventListener('mouseup', () => {
        isDown = false;
    })
    
    tagsCtn.addEventListener('mouseleave', () => {
        isDown = false;
    })
    
    tagsCtn.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
    
        const x = e.pageX - tagsCtn.offsetLeft;
        const walk = x - startX;
        console.log({x, startX, scrollLeft});
        tagsCtn.scrollLeft =  scrollLeft - walk;
    })
}

dragSlider();

function clickSlider() {
    let tagsCtn = document.querySelector('.tags'); // get element of tags container
    let nextBtn = document.querySelector('.next-btn'); // get element of next button
    let count = 1;

    nextBtn.addEventListener('click', () => {
        tagsCtn.style.transform = `translateX(${-200 * count}px)`
        count++;
    })
}

clickSlider();