import { handlePopUp } from "./popup.js";

const projectAbout = document.querySelector(".projectAbout");
const contact_us = document.querySelector(".con");
const intro_li = document.querySelectorAll(".intro_li");

projectAbout.addEventListener("click", (event) => {
    const projectLiId = event.target.closest("li").getAttribute("id");
    console.log(projectLiId);
    const img = handleImageChooseViaText(projectLiId);
    domProjectImg(img);
})

function handleImageChooseViaText(id) {
    if (id === "one") {
        return 'image.png';
    } else if (id === "two") {
        return 'texture watch instagram post.png'
    } else if (id === "three") {
        return 'billi-2.png';
    }
}

function domProjectImg(img) {
    const projetImg = document.querySelector(".projetImg");
    projetImg.innerHTML = `<img src="./assests/${img}" alt="image">`
}


contact_us.addEventListener("click", handlePopUp)

document.addEventListener('DOMContentLoaded', () => {
    console.log("i am called");
    const slider = document.querySelector('.slider');
    const sliderItems = document.querySelectorAll('.intro_li');
    const dotsContainer = document.querySelector('.dots-container');

    let currentIndex = 0;
    const itemsPerView = 3;
    const totalItems = sliderItems.length;
    console.log(totalItems);

    // Create dots based on total number of items
    for (let i = 0; i < Math.ceil(totalItems / itemsPerView); i++) {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (i === 0) {
            dot.classList.add('active');
        }
        dot.addEventListener('click', () => {
            currentIndex = i;
            updateSliderPosition();
            updateDots();
        });
        dotsContainer.appendChild(dot);
    }

    function updateSliderPosition() {
        const translateXValue = -currentIndex * (100 / itemsPerView);
        slider.style.transform = `translateX(${translateXValue}%)`;
    }

    function updateDots() {
        const dots = dotsContainer.querySelectorAll('.dot'); // Select dots only within the container

        dots.forEach((dot, index) => {
            if (index === currentIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }
});


intro_li.forEach((intro) => {
    intro.addEventListener('mouseenter', () => {
        if (!intro.querySelector(".intro_wrapper")) {
            const imageWrapper = document.createElement('div');
            imageWrapper.classList.add('intro_wrapper');
            imageWrapper.innerHTML = `
            <img class="intro_img" src="./assests/icon.png" alt="">
            <h3 class="intro_h3">WEB DEVELOPMENT</h3>
            <p class="intro_p">Morbi sed lacus nec risus finibus feugiat et fermentum nibh. Pellentesque</p>
            <button class="intro_btn_1">
                <a href="https://www.fylehq.com/" target="_blank">READ MORE</a>
                <img class = "intro_btn_1_img" src="./assests/arrow.png" alt="">
            </button>
        `;

            intro.appendChild(imageWrapper);
        }
    })
})

intro_li.forEach((intro) => {
    intro.addEventListener('mouseleave', () => {
        const imageWrappper = intro.querySelector(".intro_wrapper");
        if (imageWrappper) {
            intro.removeChild(imageWrappper);
        }
    })
})