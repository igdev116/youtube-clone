// parse translateX value to number
function transValue(value) {
    return Number(value.replace(/[^-?\d.]/g, ''));
}

// create drag slider
function dragSlider() {
    // set main width for tags container
    let tagsCtnMainWidth = () => {
        let tags = tagsCtn.querySelectorAll('.tag'); // get element of tags 
        let tagsCtnWidth = 0;

        for (let tag of tags) {
            tagsCtnWidth += tag.getBoundingClientRect().width;
        }
        tagsCtn.style.width = `${tagsCtnWidth}px`;

        return tagsCtnWidth;
    }

    let tagsParCtn = document.querySelector('.tags-container'); // get element of tags parent container
    let tagsCtn = tagsParCtn.querySelector('.tags'); // get element of tags container
    let tagsParCtnWidth = tagsParCtn.getBoundingClientRect().width; // get width of tags parent container    
    let tagsCtnWidth = tagsCtnMainWidth(); // get width of tags container
    let maxTransX = -(tagsCtnWidth - tagsParCtnWidth) // max translateX value
    let distance = Math.floor(maxTransX); // get redundant part of the parent tags container compared to tag container
    
    let isDown = false,
        isMove = false,
        startX,
        scrollLeft = 0,
        updateValue = 0;

    tagsCtn.addEventListener('mousedown', (e) => {
        isDown = true;
        startX = e.pageX - tagsCtn.offsetLeft;

        // the value will be updated 1 time per new drag  
        if (isMove) {
            updateValue += scrollLeft;
            isMove = false;
        }        
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
        
        isMove = true;
        const x = e.pageX - tagsCtn.offsetLeft;

        // handle when the user drags to the left
        if (x < startX || transValue(tagsCtn.style.transform) < 0) {
            const walk = x - startX;
            scrollLeft = walk; // the value when dragged will be continuously updated

            tagsCtn.style.transform = `translateX(${updateValue + walk}px)`;

            // handle when the user drags all the way to the left
            if (transValue(tagsCtn.style.transform) <= distance) {                
                startX = x;
                updateValue = maxTransX; // the value will be updated to maximum

                tagsCtn.style.transform = `translateX(${maxTransX}px)`;
            }
        }
        // handle when the user drags all the way to the right
        else if (x > startX) {
            startX = x;
            updateValue = 0; // the value will be updated to its original state
            scrollLeft = 0;
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

// clickSlider();