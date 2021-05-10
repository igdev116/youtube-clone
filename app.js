// parse translateX value to number
function parseValue(value) {
    return Number(value.replace(/[^-?\d.]/g, ''));
}

// create sliders
function slider() {
    // set main width for tags container
    let tagsCtnMainWidth = () => {
        let tags = tagsCtn.querySelectorAll('.tag'), // get element of tags 
            tagsCtnWidth = 0,
            paddingLeft = window.getComputedStyle(tagsCtn).paddingLeft || 0,
            paddingRight = window.getComputedStyle(tagsCtn).paddingRight || 0;

        for (let tag of tags) {
            tagsCtnWidth += tag.getBoundingClientRect().width;
        }

        tagsCtn.style.width = `${tagsCtnWidth + parseValue(paddingLeft) + parseValue(paddingRight)}px`;
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
            if (x < startX || parseValue(tagsCtn.style.transform) < 0) {
                const walk = x - startX;
                scrollLeft = walk; // the value when dragged will be continuously updated

                tagsCtn.style.transform = `translateX(${updateValue + walk}px)`;

                // handle when the user drags all the way to the left
                if (parseValue(tagsCtn.style.transform) <= distance) {
                    startX = x;
                    updateValue = distance; // the value will be updated to maximum

                    tagsCtn.style.transform = `translateX(${distance}px)`;
                }

                show(prevBtn);

                if (Math.ceil(parseValue(tagsCtn.style.transform)) <= Math.ceil(distance)) {
                    hide(nextBtn);
                } else {
                    show(nextBtn);
                }
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
            tagsCtn.style.transform = `translateX(${parseValue(tagsCtn.style.transform) - 320}px)`;

            if (parseValue(tagsCtn.style.transform) <= -distance) {
                tagsCtn.style.transform = `translateX(-${distance}px)`;
                hide(nextBtn);
            }

            updateValue = parseValue(tagsCtn.style.transform);
            scrollLeft = 0;
            show(prevBtn);
        })

        prevBtn.addEventListener('click', () => {
            tagsCtn.style.transform = `translateX(${parseValue(tagsCtn.style.transform) + 320}px)`;

            if (parseValue(tagsCtn.style.transform) >= 0) {
                tagsCtn.style.transform = `translateX(0px)`;
                hide(prevBtn);
            }

            updateValue = parseValue(tagsCtn.style.transform);
            scrollLeft = 0;
            show(nextBtn);
        })
    }

    clickSlider();

    function moveSidebar() {
        let menuBtn = document.querySelector('.header-menu-btn'), // get element of menu button
            largeSidebar = document.querySelector('.sidebar-large'), // get element of large sidebar
            smallSidebar = document.querySelector('.sidebar-small'), // get element of small sidebar
            cardsCtn = document.querySelector('.cards'); // get element of cards container


        menuBtn.addEventListener('click', () => {
            largeSidebar.classList.toggle('closed');
            smallSidebar.classList.toggle('closed');
            tagsParCtn.classList.toggle('tags-container-small');
            cardsCtn.classList.toggle('cards-small');

            let tagsParCtnWidth = tagsParCtn.getBoundingClientRect().width, // get width of tags parent container  
                tagsCtnWidth = tagsCtnMainWidth(), // get width of tags container
                distance = -(tagsCtnWidth - tagsParCtnWidth); // get redundant part of the parent tags container compared to tag container

            if (Math.ceil(parseValue(tagsCtn.style.transform)) <= Math.ceil(distance)) {
                hide(nextBtn);
            } else {
                show(nextBtn);
            }
        })
    }

    moveSidebar();
}

slider();

// render cards
function renderCards() {
    const cardsInfo = [
        {
            title: 'Khoá học evondev của mình có gì ? Và vì sao mà bạn nên tham gia',
            thumb: '1',
            avatar: '1',
            userName: 'Evondev',
            views: '12.3B',
            time: '2 days',
            duration: '1:04:02'
        },
        {
            title: 'Designing & Building a Personal Portfolio from SCRATCH!',
            thumb: '2',
            avatar: '2',
            userName: 'F8',
            views: '55.7K',
            time: '2 seconds',
            duration: '31:03'
        },
        {
            title: 'YouTube Create Awesome Web Designs | Layout Design Tutorial',
            thumb: '3',
            avatar: '3',
            userName: 'CFD',
            views: '31.2K',
            time: '12 months',
            duration: '21:02'
        },
        {
            title: 'NewTechShop REVIEW] Đánh Giá Surface Laptop 2 Chi Tiết Từ A Đến Z',
            thumb: '4',
            avatar: '4',
            userName: 'Erik',
            views: '1.02M',
            time: '55 seconds',
            duration: '43:12'
        },
        {
            title: 'freeCodeCamp Give your CSS superpowers by learning Sass',
            thumb: '5',
            avatar: '5',
            userName: 'freeCodeCamp',
            views: '69.9M',
            time: '3 minutes',
            duration: '33:32'
        },
        {
            title: 'YouTube SƠN TÙNG M-TP | MUỘN RỒI MÀ SAO CÒN | OFFICIAL MUSIC VIDEO',
            thumb: '6',
            avatar: '6',
            userName: 'Clever Progammer',
            views: '112B',
            time: '2 hours',
            duration: '13:44'
        },
        {
            title: 'Evondev là ai ?',
            thumb: '7',
            avatar: '7',
            userName: 'Baroibeo',
            views: '12',
            time: '5 days',
            duration: '6:55'
        },
        {
            title: 'F8 - Học lập trình để đi làm!',
            thumb: '8',
            avatar: '2',
            userName: 'Ren',
            views: '10.3B',
            time: '29 days',
            duration: '2:1'
        },
        {
            title: 'CFD Khóa học thực chiến front-end căn bản CFD',
            thumb: '9',
            avatar: '5',
            userName: 'F8',
            views: '12B',
            time: '12 years',
            duration: '10:01'
        },
        {
            title: 'Liên Minh 360 Thầy Ba” tổ chức tặng quà từ thiện nhân dịp trung thu',
            thumb: '10',
            avatar: '3',
            userName: 'Easy Frontend',
            views: '12K',
            time: '8 months',
            duration: '55:32'
        },
        {
            title: 'YouTube Yasuo Montage - Best Yasuo Vũ Trụ 2017',
            thumb: '11',
            avatar: '4',
            userName: 'freeCodeCamp',
            views: '101K',
            time: '2 months',
            duration: '97:12'
        },
        {
            title: 'YouTube I Opened A Restaurant That Pays You To Eat At It',
            thumb: '12',
            avatar: '6',
            userName: 'Porn',
            views: '3.9M',
            time: '2 years',
            duration: '1:03:54'
        },
        {
            title: 'YouTube QUÂN A.P - BÔNG HOA ĐẸP NHẤT [OFFICIAL LYRICS VIDEO]',
            thumb: '13',
            avatar: '7',
            userName: 'Emily',
            views: '365',
            time: '1 month',
            duration: '63:48'
        },
        {
            title: 'YouTube Code cùng Ông Dev #1 | #ODLive',
            thumb: '14',
            avatar: '5',
            userName: 'Ông Dev',
            views: '11.2M',
            time: '12 days',
            duration: '04:32'
        },
        {
            title: 'YouTube Career path của frontend developer 2020 🎉',
            thumb: '15',
            avatar: '4',
            userName: 'Quoc Mang Tang',
            views: '255K',
            time: '2 days',
            duration: '11:50'
        }, {
            title: 'YouTube 2 A.M Study Session 📚 - [lofi hip hop/chill beats]',
            thumb: '16',
            avatar: '1',
            userName: 'VTV24',
            views: '3.9M',
            time: '3 days',
            duration: '12:03:11'
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

// handle button affect when clicking
function btnAffect() {
    let btns = document.querySelectorAll('.btn-active'); // get element of active buttons

    for (let btn of btns) {
        btn.addEventListener('mousedown', () => {
            btn.classList.add('btn-down');
            btn.classList.remove('btn-up');
        })

        btn.addEventListener('mouseup', () => {
            btn.classList.remove('btn-down');
            btn.classList.add('btn-up');
        })
    }
}

btnAffect();

// create dark mode button
function darkMode() {
    const toggleSwitch = document.querySelector('.toggle input[type="checkbox"]');
    const currentTheme = localStorage.getItem('theme');
    
    if (currentTheme) {
        document.documentElement.setAttribute('data-theme', currentTheme);
        if (currentTheme === 'dark') {
            toggleSwitch.checked = true;
        }
    }

    toggleSwitch.addEventListener('change', (e) => {
        if (e.target.checked) {
            console.log(e.target.checked);
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        } else {
            console.log(e.target.checked);
            document.documentElement.setAttribute('data-theme', 'light');
            localStorage.setItem('theme', 'light');
        }
    });
}

darkMode();

// show animated button
function showAnimatedBtn() {
    let btn = document.querySelector('.toggle'); // get element of toggle button
    let isShow = false;
    screenWidth = window.screen.width; // get screen width

    document.addEventListener('mousemove', (e) => {
        if (e.pageX >= screenWidth - 5) {
            btn.style.opacity = 1;
            btn.style.transform = `translateX(0)`;
        } 

        if (e.pageX <= screenWidth - 400) {
            btn.style.opacity = 1;
            btn.style.transform = `translateX(calc(100% + 10px))`;
        }
    })

}

showAnimatedBtn();