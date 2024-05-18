// check if there's local storage color option
let mainColor = localStorage.getItem("color-option");

if (mainColor !== null) {
    document.documentElement.style.setProperty('--main-color', mainColor);

    //check active class

    // remove active from all children
    document.querySelectorAll(".colors-list li")
        .forEach(element => {
            element.classList.remove("active");

            if (element.dataset.color == mainColor) {
                element.classList.add("active");
            }
        })
}

// variable to check
let backgroundOption = true;

// variable to control the interval
let backgroundInterval;

// check random background local storage
let backgroundLocalItem = localStorage.getItem("background_option");

if (backgroundLocalItem !== null) {
    if (backgroundLocalItem == 'true') {
        backgroundOption = true;
    } else {
        backgroundOption = false;
    }

    //Remove Active class from all spans
    document.querySelectorAll(".random-backgrounds span").forEach(
        element => {
            element.classList.remove("active");
        }
    )

    if (backgroundLocalItem == 'true') {
        document.querySelector(".random-backgrounds .yes")
            .classList.add("active")
    } else {
        document.querySelector(".random-backgrounds .no")
            .classList.add("active")
    }
}

randomizeImgs();

// toggle spin class on icon
document.querySelector(".toggle-sitting i").onclick = () => {
    //toggle class
    document.querySelector(".settings-box").classList.toggle("open")
}

// switch colors active selected color
const colorsLi = document.querySelectorAll(".colors-list li")

colorsLi.forEach(li => {
    li.addEventListener("click", (e) => {
        //set root color
        document.documentElement.style.setProperty('--main-color', e.target.dataset.color);

        //set color on local storage
        localStorage.setItem("color-option", e.target.dataset.color);

        // remove active from all children
        e.target.parentElement.querySelectorAll(".active")
            .forEach(element => {
                element.classList.remove("active");
            })
        // add active class on target
        e.target.classList.add("active");
    })
})

// random background option (active button yes or no)
const randomBackEl = document.querySelectorAll(".random-backgrounds span")

randomBackEl.forEach(span => {
    span.addEventListener("click", (e) => {
        // remove active from all children
        e.target.parentElement.querySelectorAll(".active")
            .forEach(element => {
                element.classList.remove("active");
            })
        // add active class on target
        e.target.classList.add("active");

        if (e.target.dataset.bg == "yes") {
            localStorage.setItem("background_option", true);
            backgroundOption = true;
            randomizeImgs();
        } else {
            localStorage.setItem("background_option", false);
            backgroundOption = false;
            clearInterval(backgroundInterval);
        }
    })
})

// change background randomly
// select landing page element
let landingPage = document.querySelector('.landing-page');

// get array of imgs
let imgsArray = ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg"];

// function to change the background randomly
function randomizeImgs() {
    if (backgroundOption) {
        // change background image periodically
        backgroundInterval = setInterval(() => {
            // get random number
            let randomNumber = Math.floor(Math.random() * imgsArray.length);
            //change background image url
            landingPage.style.backgroundImage = 'url("imgs/' + imgsArray[randomNumber] + '")';
        }, 1000);
    }
}


// progress bar animation
let ourSkills = document.querySelector(".skills");

window.onscroll = function () {
    let skillsOffsetTop = ourSkills.offsetTop;

    //outer height
    let skillsOuterHeight = ourSkills.offsetHeight

    //window height
    let windowHeight = this.innerHeight;

    // window scroll top
    let windowScrollTop = this.scrollY;

    if (windowScrollTop > (skillsOffsetTop + skillsOuterHeight - windowHeight)) {
        let skills = document.querySelectorAll(".skill-box .skill-progress span");
        skills.forEach(skill => {
            skill.style.width = skill.dataset.progress;
        })
    }
}

// image popup
let gallery = document.querySelectorAll(".gallery img");
gallery.forEach(img => {
    img.addEventListener("click", event => {
        //create overlay element
        let overlay = document.createElement("div");
        // add class to overlay
        overlay.className = "popup-overlay";
        // append overlay
        document.body.appendChild(overlay);

        //create the popup
        let popupBox = document.createElement("div");
        popupBox.className = "popup-box";

        // add alternating text
        if (img.alt != null) {
            // create heading
            let imgHeading = document.createElement("h3");

            //create text for heading
            let imgText = document.createTextNode(img.alt);

            //append
            imgHeading.appendChild(imgText);

            //append heading to the popup box
            popupBox.appendChild(imgHeading);
        }

        //create the image
        let popupImage = document.createElement("img");
        popupImage.src = img.src;

        //add img to popup box
        popupBox.appendChild(popupImage);

        //append popupBox to body
        document.body.appendChild(popupBox);

        //create the close span
        let closeButton = document.createElement("span");

        //
        let closeButtonText = document.createTextNode("X");
        //
        closeButton.appendChild(closeButtonText);
        //add class to close button
        closeButton.className = "close-button";
        // add close button to the popup box
        popupBox.appendChild(closeButton);

    })
})

//
document.addEventListener("click", (event) => {
    if (event.target.className == "close-button") {
        //remove popup
        event.target.parentElement.remove();
        //remove overlay
        document.querySelector(".popup-overlay").remove();
    }
})