// parse translateX value to number
function transValue(value) {
    return Number(value.replace(/[^-?\d.]/g, ''));
}

// create sliders
function slider() {
    // set main width for tags container
    let tagsCtnMainWidth = () => {
        let tags = tagsCtn.querySelectorAll('.tag'); // get element of tags 
        let tagsCtnWidth = 0;
        let paddingLeft = window.getComputedStyle(tagsCtn).paddingLeft || 0;
        let paddingRight = window.getComputedStyle(tagsCtn).paddingRight || 0;

        for (let tag of tags) {
            tagsCtnWidth += tag.getBoundingClientRect().width;
        }

        tagsCtn.style.width = `${tagsCtnWidth + transValue(paddingLeft) + transValue(paddingRight)}px`;
        return tagsCtn.getBoundingClientRect().width;
    }

    let tagsParCtn = document.querySelector('.tags-container'), // get element of tags parent container
        tagsCtn = tagsParCtn.querySelector('.tags'), // get element of tags container
        nextBtn = tagsParCtn.querySelector('.next-btn'), // get element of next button
        prevBtn = tagsParCtn.querySelector('.prev-btn'), // get element of next button
    
        tagsParCtnWidth = tagsParCtn.getBoundingClientRect().width, // get width of tags parent container  
        tagsCtnWidth = tagsCtnMainWidth(), // get width of tags container

        distance = -(tagsCtnWidth - tagsParCtnWidth), // get redundant part of the parent tags container compared to tag container
        isDown = false,
        isMove = false, // prevent continuous clicking on the slide
        startX,
        scrollLeft = 0,
        updateValue = 0;

    // hide or show buttons
    let hide = (el) => {
        el.style.display = 'none';
    }    
    let show = (el) => {
        el.style.display = 'block';
    }

    // create drag slider
    let dragSlider = () => {
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
                    updateValue = distance; // the value will be updated to maximum
    
                    tagsCtn.style.transform = `translateX(${distance}px)`;
                }

                if (true) transValue(tagsCtn.style.transform) <= distance ? hide(nextBtn) : show(nextBtn);

                show(prevBtn);
            }
            // handle when the user drags all the way to the right
            else if (x > startX) {
                startX = x;
                updateValue = 0; // the value will be updated to its original state
                scrollLeft = 0; // the value will be updated to its original state
                tagsCtn.style.transform = `translateX(0px)`;

                hide(prevBtn);
            }
        })
    }

    dragSlider();

    // create click slider
    let clickSlider = () => {        
        let tagsParCtnWidth = tagsParCtn.getBoundingClientRect().width; // get width of tags parent container
        let tagsCtnWidth = tagsCtn.getBoundingClientRect().width; // get width of tags container

        let distance = tagsCtnWidth - tagsParCtnWidth; // get redundant part of the parent tags container compared to tag container

        prevBtn.style.display = 'none';

        nextBtn.addEventListener('click', () => {
            tagsCtn.style.transform = `translateX(${transValue(tagsCtn.style.transform) - 320}px)`;

            if (transValue(tagsCtn.style.transform) <= -distance) {
                tagsCtn.style.transform = `translateX(-${distance}px)`;
                hide(nextBtn);
            }
            
            updateValue = transValue(tagsCtn.style.transform);
            scrollLeft = 0;
            show(prevBtn);
        })

        prevBtn.addEventListener('click', () => {
            tagsCtn.style.transform = `translateX(${transValue(tagsCtn.style.transform) + 320}px)`;
            
            if (transValue(tagsCtn.style.transform) >= 0) {
                tagsCtn.style.transform = `translateX(0px)`;
                hide(prevBtn);
            }
            
            updateValue = transValue(tagsCtn.style.transform);
            scrollLeft = 0;
            show(nextBtn);
        })
    }

    clickSlider();
}

slider();

// render cards
function renderCards() {
    const cardsInfo = [
        {
            title: '8 reasons to start using SCSS right now',
            thumb: '1',
            avatar: '1',
            userName: 'Dev Ed',
            views: '3.9M',
            time: '2 days',
            duration: '3:32'
        },
        {
            title: '8 reasons to start using SCSS right now',
            thumb: '1',
            avatar: '1',
            userName: 'Dev Ed',
            views: '3.9M',
            time: '2 days',
            duration: '3:32'
        },
        {
            title: '8 reasons to start using SCSS right now',
            thumb: '1',
            avatar: '1',
            userName: 'Dev Ed',
            views: '3.9M',
            time: '2 days',
            duration: '3:32'
        },
        {
            title: '8 reasons to start using SCSS right now',
            thumb: '1',
            avatar: '1',
            userName: 'Dev Ed',
            views: '3.9M',
            time: '2 days',
            duration: '3:32'
        },
        {
            title: '8 reasons to start using SCSS right now',
            thumb: '1',
            avatar: '1',
            userName: 'Dev Ed',
            views: '3.9M',
            time: '2 days',
            duration: '3:32'
        },
        {
            title: '8 reasons to start using SCSS right now',
            thumb: '1',
            avatar: '1',
            userName: 'Dev Ed',
            views: '3.9M',
            time: '2 days',
            duration: '3:32'
        },
        {
            title: '8 reasons to start using SCSS right now',
            thumb: '1',
            avatar: '1',
            userName: 'Dev Ed',
            views: '3.9M',
            time: '2 days',
            duration: '3:32'
        },
        {
            title: '8 reasons to start using SCSS right now',
            thumb: '1',
            avatar: '1',
            userName: 'Dev Ed',
            views: '3.9M',
            time: '2 days',
            duration: '3:32'
        },
        {
            title: '8 reasons to start using SCSS right now',
            thumb: '1',
            avatar: '1',
            userName: 'Dev Ed',
            views: '3.9M',
            time: '2 days',
            duration: '3:32'
        },
        {
            title: '8 reasons to start using SCSS right now',
            thumb: '1',
            avatar: '1',
            userName: 'Dev Ed',
            views: '3.9M',
            time: '2 days',
            duration: '3:32'
        },
        {
            title: '8 reasons to start using SCSS right now',
            thumb: '1',
            avatar: '1',
            userName: 'Dev Ed',
            views: '3.9M',
            time: '2 days',
            duration: '3:32'
        },
        {
            title: '8 reasons to start using SCSS right now',
            thumb: '1',
            avatar: '1',
            userName: 'Dev Ed',
            views: '3.9M',
            time: '2 days',
            duration: '3:32'
        },
        {
            title: '8 reasons to start using SCSS right now',
            thumb: '1',
            avatar: '1',
            userName: 'Dev Ed',
            views: '3.9M',
            time: '2 days',
            duration: '3:32'
        },
        {
            title: '8 reasons to start using SCSS right now',
            thumb: '1',
            avatar: '1',
            userName: 'Dev Ed',
            views: '3.9M',
            time: '2 days',
            duration: '3:32'
        },
        {
            title: '8 reasons to start using SCSS right now',
            thumb: '1',
            avatar: '1',
            userName: 'Dev Ed',
            views: '3.9M',
            time: '2 days',
            duration: '3:32'
        },{
            title: '8 reasons to start using SCSS right now',
            thumb: '1',
            avatar: '1',
            userName: 'Dev Ed',
            views: '3.9M',
            time: '2 days',
            duration: '3:32'
        },
    ] // save cards info

    let cardsCtn = document.querySelector('.cards'); // get element of cards container
    let cards = '';

    for (let cardInfo of cardsInfo) {
        cards += `
        <div class="card">
            <a href="#" class="card-link">
                <div class="card-thumbnail">
                    <img src="img/thumb-${cardInfo.thumb}.png" alt="">
                    <div class="card-times">${cardInfo.duration}</div>
                </div>

                <div class="card-content">
                    <div class="card-avatar">
                        <img src="img/user-${cardInfo.avatar}.png" alt="">
                    </div>

                    <div class="card-description">
                        <h3 class="card-title">${cardInfo.title}</h3>
                        <div class="card-user">
                            <span class="card-user__name">${cardInfo.userName}</span>
                            <span class="card-user__verified">
                                <i class='bx bxs-check-circle'></i>
                            </span>
                        </div>

                        <div class="card-info">
                            <span class="card-views">${cardInfo.views} views</span>
                            <span class="card-date">${cardInfo.time} ago</span>
                        </div>

                        <div class="card-options">
                            <i class='bx bx-dots-vertical-rounded'></i>
                        </div>
                    </div>
                </div>
            </a>
        </div>
        `
    }

    cardsCtn.innerHTML = cards;
}

renderCards();