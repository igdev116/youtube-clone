// parse translateX value to number
function transValue(value) {
    return Number(value.replace(/[^-?\d.]/g, ''));
}

// create drag slider
function dragSlider() {
    let tagsCtn = document.querySelector('.tags'); // get element of tags container
    let isDown = false,
        startX,
        scrollLeft = 0,
        updateValue = 0;

    tagsCtn.addEventListener('mousedown', (e) => {
        isDown = true;
        startX = e.pageX - tagsCtn.offsetLeft;
        updateValue += scrollLeft; // value will be updated every next click
        console.log({updateValue});
        // tagsCtn.style.transform = `translateX(${updateValue}px)`;
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
        let x = e.pageX - tagsCtn.offsetLeft;
        
        
        if (x < startX || transValue(tagsCtn.style.transform) < 0) {
            let walk = x - startX;
            scrollLeft = 0 + walk;
            tagsCtn.style.transform = `translateX(${updateValue + walk}px)`;
        } 
        // handle when the user drags all the way to the right
        else if (x > startX) {
            startX = x;
            // updateValue = 0;
            // scrollLeft = 0;
            tagsCtn.style.transform = `translateX(0px)`;
        }
        
    })
}

dragSlider();

// create click slider
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