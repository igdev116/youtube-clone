function dragSlider() {
    let tagsCtn = document.querySelector('.tags'); // get element of tags container
    let isDown = false;
    let startX;
    let scrollLeft = 0;
    let updateValue = 0;
    
    tagsCtn.addEventListener('mousedown', (e) => {
        isDown = true;
        startX = e.pageX - tagsCtn.offsetLeft;
        updateValue += scrollLeft;
    })
    
    tagsCtn.addEventListener('mouseup', () => {
        isDown = false;
        console.log('Done');
    })
    
    tagsCtn.addEventListener('mouseleave', () => {
        isDown = false;
    })
    
    tagsCtn.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();

        const x = e.pageX - tagsCtn.offsetLeft;
        const walk = x - startX;
        scrollLeft = 0 + walk;

        tagsCtn.style.transform = `translateX(${updateValue + walk}px)`;
        // clickSlider(walk);
    })
}

dragSlider();

function clickSlider(walk) {
    let tagsCtn = document.querySelector('.tags'); // get element of tags container
    let nextBtn = document.querySelector('.next-btn'); // get element of next button
    let count = 1;

    nextBtn.addEventListener('click', () => {
        tagsCtn.style.transform = `translateX(${walk - 320 * count}px)`
        count++;
    })
}

clickSlider();