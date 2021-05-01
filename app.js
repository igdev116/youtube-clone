function transValue(value) {
    return Number(value.replace(/[^-?\d.]/g, ''));
}

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
        let walk = x - startX;
        scrollLeft = 0 + walk;
       
        tagsCtn.style.transform = `translateX(${updateValue + walk}px)`;

        if (transValue(tagsCtn.style.transform) > 0) {
            tagsCtn.style.transform = `translateX(0px)`;
            updateValue = 0;
        }

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