const SITE_PASSWORD = "ungrateful peasant";



/* ================================= */
/* LOGIN */
/* ================================= */

function login() {

    const passwordInput =
        document.getElementById("password");

    const message =
        document.getElementById("loginMessage");

    const website =
        document.getElementById("website");

    const loginScreen =
        document.getElementById("loginScreen");

    const enteredPassword =
        passwordInput.value.trim();


    if (enteredPassword === SITE_PASSWORD) {

        message.style.color = "#547765";

        message.innerText =
            "✓ access granted";


        setTimeout(() => {

            loginScreen.style.display = "none";

            website.classList.remove("hidden");

        }, 500);

        return;
    }


    message.style.color = "#D96F88";

    message.innerText =
        "hmmm. suspicious. try again 😭";

    passwordInput.value = "";


    passwordInput.animate(
        [
            {
                transform: "translateX(0)"
            },
            {
                transform: "translateX(-8px)"
            },
            {
                transform: "translateX(8px)"
            },
            {
                transform: "translateX(-6px)"
            },
            {
                transform: "translateX(6px)"
            },
            {
                transform: "translateX(0)"
            }
        ],
        {
            duration: 400
        }
    );
}



document
    .getElementById("password")
    .addEventListener(
        "keydown",
        function(event) {

            if (event.key === "Enter") {

                login();

            }

        }
    );



/* ================================= */
/* NAVIGATION */
/* ================================= */

function goTo(number) {

    document
        .querySelectorAll(".screen")
        .forEach(screen => {

            screen.classList.remove("active");

        });


    const target =
        document.getElementById("screen" + number);


    if (target) {

        target.classList.add("active");

    }


    window.scrollTo({
        top: 0,
        behavior: "instant"
    });


    if (number === 7) {

        startTypewriter();

    }
}



/* ================================= */
/* RUNAWAY NO BUTTON */
/* ================================= */

function runAway() {

    const button =
        document.getElementById("noButton");


    const x =
        (Math.random() - 0.5) * 260;


    const y =
        (Math.random() - 0.5) * 170;


    button.style.transform =
        `translate(${x}px, ${y}px) rotate(${Math.random() * 10 - 5}deg)`;
}



/* ================================= */
/* PHOTO POPUP */
/* ================================= */

function openPhoto(
    image,
    title,
    text
) {

    document.getElementById(
        "popupImage"
    ).innerHTML =
        `<img src="${image}" alt="${title}">`;


    document.getElementById(
        "popupLabel"
    ).innerText =
        "MEMORY ARCHIVE";


    document.getElementById(
        "popupTitle"
    ).innerText =
        title;


    document.getElementById(
        "popupText"
    ).innerText =
        text;


    document
        .getElementById("popup")
        .classList.add("active");
}



/* ================================= */
/* VIDEO CALL CAROUSEL */
/* ================================= */

const callPhotos = [
    {
        image: "images/photo1.jpg",
        title: "call archive no. 01",
        text: "apparently this conversation needed to be documented."
    },
    {
        image: "images/photo2.jpg",
        title: "call archive no. 02",
        text: "another extremely important meeting."
    },
    {
        image: "images/photo3.jpg",
        title: "call archive no. 03",
        text: "zero productivity. maximum nonsense."
    },
    {
        image: "images/photo4.jpg",
        title: "call archive no. 04",
        text: "why did we think this was a normal conversation."
    },
    {
        image: "images/photo5.jpg",
        title: "call archive no. 05",
        text: "another one for the extremely serious records."
    },
    {
        image: "images/photo6.jpg",
        title: "call archive no. 06",
        text: "proof that somehow we always find something to talk about."
    }
];


let currentCall = 0;


function updateCallCarousel() {

    const leftIndex =
        (currentCall - 1 + callPhotos.length) %
        callPhotos.length;


    const rightIndex =
        (currentCall + 1) %
        callPhotos.length;


    const leftImage =
        document.getElementById("callLeftImage");

    const centerImage =
        document.getElementById("callCenterImage");

    const rightImage =
        document.getElementById("callRightImage");


    leftImage.src =
        callPhotos[leftIndex].image;

    rightImage.src =
        callPhotos[rightIndex].image;

    centerImage.src =
        callPhotos[currentCall].image;


    document.getElementById(
        "callCenterLabel"
    ).innerText =
        "call no. " +
        String(currentCall + 1).padStart(2, "0");


    document.getElementById(
        "callCounter"
    ).innerText =
        String(currentCall + 1).padStart(2, "0") +
        " / 06";
}



function nextCall() {

    currentCall++;

    if (currentCall >= callPhotos.length) {

        currentCall = 0;

    }

    animateCarousel();

}



function previousCall() {

    currentCall--;

    if (currentCall < 0) {

        currentCall = callPhotos.length - 1;

    }

    animateCarousel();

}



function animateCarousel() {

    const track =
        document.querySelector(".call-track");


    track.classList.remove("carousel-moving");

    void track.offsetWidth;

    track.classList.add("carousel-moving");


    updateCallCarousel();

}



function openCurrentCall(offset) {

    let index =
        currentCall + offset;


    if (index < 0) {

        index =
            callPhotos.length - 1;

    }


    if (index >= callPhotos.length) {

        index = 0;

    }


    const photo =
        callPhotos[index];


    openPhoto(
        photo.image,
        photo.title,
        photo.text
    );
}



/* ================================= */
/* SWIPE SUPPORT */
/* ================================= */

let touchStartX = 0;
let touchEndX = 0;


const callCarousel =
    document.querySelector(".call-carousel");


callCarousel.addEventListener(
    "touchstart",
    function(event) {

        touchStartX =
            event.changedTouches[0].screenX;

    },
    {
        passive: true
    }
);


callCarousel.addEventListener(
    "touchend",
    function(event) {

        touchEndX =
            event.changedTouches[0].screenX;

        handleSwipe();

    },
    {
        passive: true
    }
);


function handleSwipe() {

    const difference =
        touchStartX - touchEndX;


    if (Math.abs(difference) < 45) {

        return;

    }


    if (difference > 0) {

        nextCall();

    } else {

        previousCall();

    }
}



/* ================================= */
/* SECRET HUNT */
/* ================================= */

function findSecret(part) {

    if (part === 1) {

        showSecret(
            "🩷 SECRET FOUND",
            "you found the suspicious pink thing.",
            "CODE FRAGMENT: 67\n\nremember it 👀"
        );

        return;
    }


    if (part === 2) {

        showSecret(
            "🩷 SECRET FOUND",
            "okay detective...",
            "CODE FRAGMENT: 67\n\nthat should be the other half."
        );

        return;
    }
}



/* ================================= */
/* SECRET POPUP */
/* ================================= */

function showSecret(
    label,
    title,
    text
) {

    document.getElementById(
        "popupImage"
    ).innerHTML = "";


    document.getElementById(
        "popupLabel"
    ).innerText =
        label;


    document.getElementById(
        "popupTitle"
    ).innerText =
        title;


    document.getElementById(
        "popupText"
    ).innerText =
        text;


    document
        .getElementById("popup")
        .classList.add("active");
}



/* ================================= */
/* CLOSE POPUP */
/* ================================= */

function closePopup() {

    document
        .getElementById("popup")
        .classList.remove("active");
}



/* ================================= */
/* CODE LOCK */
/* ================================= */

const PASSCODE = "6767";


function checkCode() {

    const input =
        document
            .getElementById("codeInput")
            .value
            .trim();


    const message =
        document.getElementById("codeMessage");


    const box =
        document.querySelector(".code-box");


    if (input === PASSCODE) {

        message.style.color = "#547765";

        message.innerText =
            "✓ ACCESS GRANTED";


        createConfetti();


        setTimeout(() => {

            goTo(7);

        }, 900);


        return;
    }


    message.style.color = "#D96F88";

    message.innerText =
        "✕ nope. try again 😭";


    box.animate(
        [
            {
                transform: "translateX(0)"
            },
            {
                transform: "translateX(-10px)"
            },
            {
                transform: "translateX(10px)"
            },
            {
                transform: "translateX(-7px)"
            },
            {
                transform: "translateX(7px)"
            },
            {
                transform: "translateX(0)"
            }
        ],
        {
            duration: 450
        }
    );
}



document.addEventListener(
    "keydown",
    function(event) {

        const screenSix =
            document.getElementById("screen6");


        if (
            event.key === "Enter" &&
            screenSix.classList.contains("active")
        ) {

            checkCode();

        }

    }
);



/* ================================= */
/* TYPEWRITER LETTER */
/* ================================= */

const message =
`I don't really know how to put everything into words.

cuz uk i'm not very good w words plus okay lemme get to da point 
(idk how to write emo emo stuff i wanted to try)

jokes apartt I'm really glad you exist.

thankss for all the random conversations,
u da awesomeee ,
and uhm bro jst know that no matter what i'll always be here for you(is ts too cheesy idk go) with tissue boxes so u dont hav to worry about snorts,
 and make shure to hit me up whenever u feel downnnn 
plus enjoy ur day (i feel like a 10th grader wrting sm love letter typa stuff but idc) and have a great year aheaddd.

riseee anddd shineeeee ...

i hope u achieve yeverything u want and moreeeeee 
live ya peaceful life and be happyyy and stufffff
and uh wat do they sayyy haaannn may all the gooddness reachhh and surround u let's gooo and have a great year aheadddddd


muhehehehheeheheheh
thassit ig ilyy 💖💖

ONCEEEE AGAINNNNN HAPPPYYYY BIRTHHHDAYYYYYYYYyyyyyyyyy💖💖💖

your present might arrive late but i hope u like itttttt u better do or else imma hit u 

I hope you know that you mean a lot to me.

Anywaysss...

that's enough emotional damage for today.

enjoyy daa dayyyy yayyyy byeeee bratttt`;


let typingStarted = false;


function startTypewriter() {

    if (typingStarted) {

        return;

    }


    typingStarted = true;


    const element =
        document.getElementById("typedMessage");


    let index = 0;


    element.innerText = "";


    function type() {

        if (index < message.length) {

            element.innerText +=
                message.charAt(index);


            index++;


            setTimeout(
                type,
                25
            );

        }

    }


    type();
}



/* ================================= */
/* FINAL SURPRISE */
/* ================================= */

function finalSurprise() {

    createConfetti();


    setTimeout(() => {

        showSecret(
            "WAIT.",
            "you actually thought that was it? 😭",
            "thanksss forrr sharing ur bright rays of sunshine and becoming such an important part of my life."
        );

    }, 300);
}



/* ================================= */
/* START OVER */
/* ================================= */

function startOver() {

    closePopup();

    typingStarted = false;

    currentCall = 0;

    updateCallCarousel();


    document.getElementById(
        "typedMessage"
    ).innerText = "";


    document.getElementById(
        "codeInput"
    ).value = "";


    document.getElementById(
        "codeMessage"
    ).innerText = "";


    document.getElementById(
        "loginMessage"
    ).innerText = "";


    document.getElementById(
        "website"
    ).classList.remove("hidden");


    document.getElementById(
        "loginScreen"
    ).style.display = "none";


    goTo(1);
}



/* ================================= */
/* CONFETTI */
/* ================================= */

function createConfetti() {

    if (
        typeof confetti === "undefined"
    ) {

        return;

    }


    confetti({

        particleCount: 120,

        spread: 90,

        origin: {
            y: 0.65
        }

    });
}