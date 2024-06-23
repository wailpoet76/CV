// Check If There's Local Storage Variables
//************************************* */
//*********  Local Storage      ******* */
//************************************* */
var mainColors = localStorage.getItem("color_option");
var frontColors = localStorage.getItem("front_color");
var backColors = localStorage.getItem("back_color");
var boxColors = localStorage.getItem("box_color");
var checkCase = localStorage.getItem("checkCase");
var imageCond = localStorage.getItem("imageCond");


// If There's Color Item In Local Storage
if (mainColors !== null) {
    paintPage();

    document.querySelector('.toggle-checkbox').checked = +checkCase;

    adjustColors();
}
//************************************* */
//*********  elements handler   ******* */
//************************************* */
//general variables
// const pageHeight = document.body.clientHeight;
const pageHeight = document.documentElement.scrollHeight;
let currentHeight = document.documentElement.clientHeight;
const topBtn = document.querySelector('.top');

//side bar
const choiceBox = document.querySelector(".choice-box");
const toggleBox = document.querySelector(".toggle");
const toggleCheck = document.querySelector(".toggle-checkbox");
const toggleGear = document.querySelector(".fa-gear");
const colors = document.querySelectorAll(".colors-list li");
const randImg = document.querySelectorAll(".random-backgrounds span");
let timer;//for image changing
let image = document.querySelector('.Header');
let reset = document.querySelector('.reset-options');
//header
const menu = document.querySelector(".menu_items ul");
const menuLi = document.querySelectorAll(".menu_items ul li");
const icon = document.querySelector(".menu_items .menuIcon");

//************************************* */
//*********         Work        ******* */
//************************************* */
window.onload = () => {
    if (imageCond === null || imageCond == "true") {
        randImg[0].click();
    } else {
        randImg[1].click();
    }
    if (document.body.offsetWidth <= 885) resize();
}

window.onscroll = () => {
    let scrollTop = document.documentElement.scrollTop;//where the scroller
    if (scrollTop > 300) {
        topBtn.style.display = 'flex';
    } else {
        topBtn.style.display = 'none';
    }
}


//************************************* */
//*********         SideBar     ******* */
//************************************* */

toggleBox.onclick = function () {
    choiceBox.classList.toggle("open");
    toggleGear.classList.toggle("fa-spin");
}

colors.forEach(element => {
    element.style.backgroundColor = element.dataset.color;
    element.addEventListener("click", function (ev) {
        mainColors = element.dataset.color;
        localStorage.setItem("color_option", mainColors);
        adjustColors();
    })
});


//************************************* */
//*********     style color     ******* */
//************************************* */

toggleCheck.addEventListener("click", function () {
    if (toggleCheck.checked) {
        frontColors = "#20242d";
        backColors = "#fff";
        boxColors = "#DDD";
        localStorage.setItem("checkCase", "1");
    } else {

        frontColors = "#fff";
        backColors = "#20242d";
        boxColors = "#272020";
        localStorage.setItem("checkCase", "0");
    }
    paintPage();
    localStorage.setItem("front_color", frontColors);
    localStorage.setItem("back_color", backColors);
    localStorage.setItem("box_color", boxColors);
});


//************************************* */
//********* Random Image Control******* */
//************************************* */
randImg[0].addEventListener('click', function () {
    randImg[0].dataset.background = 'show';
    randImg[1].dataset.background = 'hide';
    timer = setInterval(changeImage, 5000);
    localStorage.setItem("imageCond", true);
});
randImg[1].addEventListener('click', function () {
    randImg[1].dataset.background = 'show';
    randImg[0].dataset.background = 'hide';
    clearInterval(timer)
    localStorage.setItem("imageCond", false);
});

//************************************* */
//*********     Reset Options   ******* */
//************************************* */
reset.onclick = () => {
    localStorage.setItem("color_option", '#FF9800')
    localStorage.setItem("checkCase", "1");
    localStorage.setItem("front_color", '#ffffff');
    localStorage.setItem("back_color", '#20242d');
    localStorage.setItem("box_color", '#272020');
    localStorage.setItem("imageCond", true);
    //adjust Varaibles
    mainColors = localStorage.getItem("color_option");
    frontColors = localStorage.getItem("front_color");
    backColors = localStorage.getItem("back_color");
    boxColors = localStorage.getItem("box_color");
    checkCase = localStorage.getItem("checkCase");
    imageCond = localStorage.getItem("imageCond");

    //paint everything
    adjustColors();
    randImg[0].click();
    toggleCheck.click();

}

//************************************* */
//************************************* */
//************************************* */
//*********    Ends SideBar     ******* */
//************************************* */
//************************************* */
//************************************* */



//************************************* */
//*********     Menu Bar        ******* */
//************************************* */
window.addEventListener('resize', function () {
    if (document.body.clientWidth > 767) {
        icon.classList.remove('active')
        menu.style.disply = "flex";
        menu.style.transform = 'scale(1)';

    } else {
        menu.style.disply = "none";
        menu.style.transform = 'scale(0)';
    }
})
icon.addEventListener("click", function () {
    this.classList.toggle("active");
    this.classList.toggle("click");
    menu.style.transformOrigin = 'center top';
    if (this.classList.contains('click')) {
        menu.style.display = "flex";
        menu.style.top = "90px";
        menu.style.transform = 'scale(1)';

    } else {
        menu.style.transform = 'scale(0)';

    }
});

menuLi.forEach(ele => {

    ele.addEventListener("click", function () {
        icon.click();
    });

});



//************************************* */
//*********  Progress Circle    ******* */
//************************************* */
const skillItem = document.querySelectorAll('.icon');
var skillCounterName = {
    "HTML": {
        value: 70,
        interval: 0,
        delay: 32,
    },
    "CSS": {
        value: 65,
        interval: 1,
        delay: 30,
    },
    "JS": {
        value: 40,
        interval: 2,
        delay: 50,
    },
    "GIT": {
        value: 20,
        interval: 3,
        delay: 70,
    },
    "C": {
        value: 80,
        interval: 4,
        delay: 32,
    },
    "CSHARP": {
        value: 60,
        interval: 5,
        delay: 32,
    },
    "CPP": {
        value: 50,
        interval: 6,
        delay: 40,
    },
    "PHP": {
        value: 20,
        interval: 7,
        delay: 30,
    },
    "MYSQL": {
        value: 5,
        interval: 8,
        delay: 30,
    },
}
skillItem.forEach(ele => {
    var setNumber = ele.children[1].children[0].children[0].children[0];
    var skillCounterItem = ele.classList[1];//get item from object
    var skillStart = 0;
    var progBar = 440 - 440 * skillCounterName[`${skillCounterItem}`].value / 100;
    var x = [];
    ele.addEventListener('mouseenter', () => {
        skillStart = 0;
        document.documentElement.style.setProperty('--anim-value', progBar);
        var skillCounter = skillCounterName[`${skillCounterItem}`].value;
        x[skillCounterName[`${skillCounterItem}`].interval] = setInterval(() => {
            if (skillStart == skillCounter) {
                clearInterval(x[skillCounterName[`${skillCounterItem}`].interval]);
            } else {
                skillStart++;
                setNumber.textContent = `${skillStart}%`;
            }
        }, skillCounterName[`${skillCounterItem}`].delay);
    });
    ele.addEventListener('mouseleave', () => {
        skillStart = 0;
        setNumber.textContent = `${skillStart}%`;
    });
});



//************************************* */
//*********  Project Move       ******* */
//************************************* */
const slider = document.querySelector(".slider");
const sliderFrame = document.querySelector(".sliderFrame");
const left = document.querySelector(".scroller.left");
const right = document.querySelector(".scroller.right");
var widthFrame = sliderFrame.offsetWidth;
var width = slider.offsetWidth;
left.addEventListener("click", function () {
    var mover = slider.offsetLeft;
    if ((slider.offsetLeft + width) < widthFrame) {
        return false;
    }
    slider.style.left = mover - 300 + "px";
});
right.addEventListener("click", function () {
    var mover = slider.offsetLeft;
    if ((slider.offsetLeft + width) > width - 200) {
        slider.style.left = 0 + "px";
        return false;
    }
    slider.style.left = mover + 300 + "px";
});


//************************************* */
//*********  Project click      ******* */
//************************************* */

var project = document.querySelectorAll(".projectItem");
var option = ["https://wailpoet76.github.io/Login/",
    "https://wailpoet76.github.io/Gammal-Tech/",
    "https://wailpoet76.github.io/Gammal-Tech-Linear/",
    "https://wailpoet76.github.io/HTML_CSS_Template_4/",
    "https://wailpoet76.github.io/HTML_CSS_Template_3/",
    "https://wailpoet76.github.io/HTML_CSS_Template_1/",
    "https://wailpoet76.github.io/HTML_CSS_Template_2/",
    "https://wailpoet76.github.io/Drum/",
    "https://wailpoet76.github.io/Clock/",
    "https://wailpoet76.github.io/Bubbles/"
];
project.forEach(ele => {
    ele.addEventListener('click', () => {
        window.open(option[ele.dataset.number], "_blank");
    })
});


//************************************* */
//*********     TimeLine        ******* */
//************************************* */

const timelineCnt = document.querySelector(".timeline .contents")
const timelineCntLeft = document.querySelectorAll(".timeline .contents .item.left")
window.addEventListener("scroll", () => {
    const hider = document.documentElement.querySelector(".container .timeline .contents .hider");
    if (window.scrollY >= 2200) {
        hider.classList.add("active");
    }
    if (window.scrollY < 2200) {
        hider.classList.remove("active");
    }
})

window.addEventListener("resize", resize);
function resize() {
    if (document.body.offsetWidth <= 885) {
        timelineCntLeft.forEach(ele => {
            ele.classList.remove("left");
            ele.classList.add("right");
        });
    } else if (document.body.offsetWidth > 885) {
        timelineCntLeft.forEach(ele => {
            ele.classList.add("left");
            ele.classList.remove("right");
        });
    };
}


//************************************* */
//*********     CV Click        ******* */
//************************************* */
const cv = document.querySelector(".cv")
cv.onclick = function () {
    window.open("../Files/MyC.V. as Developer - 2024.pdf", "_blank");
}


//************************************* */
//*********     Footer          ******* */
//************************************* */
const contactMe = document.querySelectorAll(".footer p span")
contactMe[0].onclick = function () {
    window.open("https://www.linkedin.com/in/walid-bakr-01a3a1237", "_blank");
}
contactMe[1].onclick = function () {
    window.open("https://wa.me/+201004104024", "_blank");
}
contactMe[2].onclick = function () {
    window.open("https://www.facebook.com/walid.bakr.3", "_blank");
}



//


//************************************* */
//*********        Functions    ******* */
//************************************* */
// Remove Active Class From All Colors List Item
function adjustColors() {
    document.querySelectorAll(".colors-list li").forEach(element => {
        element.classList.remove("active");
        // Add Active Class On Element With Data-Color === Local Storage Item
        if (element.dataset.color === mainColors) {
            // Add Active Class
            element.classList.add("active");
        }
    });
    paintPage();
}

function paintPage() {
    document.documentElement.style.setProperty('--main-color', mainColors);
    document.documentElement.style.setProperty('--style-front-color', frontColors);
    document.documentElement.style.setProperty('--style-back-color', backColors);
    document.documentElement.style.setProperty('--style-box-color', boxColors);
}


function changeImage() {
    let file = Math.ceil(Math.random(1) * 10);
    image.style.backgroundImage = `url(./imgs/scroll/${file}.jpg)`

}