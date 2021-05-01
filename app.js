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
        tagsCtn.style.transform = `translateX(${updateValue + walk}px)`;
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
        
        // handle when the user drags all the way to the right
        if (x > startX) {
            startX = x;
            let walk = x - startX;
            tagsCtn.style.transform = `translateX(${updateValue + walk}px)`;
        } else {
            let walk = x - startX;
            console.log({walk});
            // scrollLeft = 0 + walk;
            tagsCtn.style.transform = `translateX(${updateValue + walk}px)`;
        }
 
        // if (transValue(tagsCtn.style.transform) > 0) {
        //     console.log(tagsCtn.style.transform)
        //     tagsCtn.style.transform = `translateX(0px)`;
        //     updateValue = 0; // if translateX value is larger than 0 then reset to original
        //     // scrollLeft = 0;
        // }
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