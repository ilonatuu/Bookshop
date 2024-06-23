// Change by clicking circles 

const entities = [
    {
        image: "images/banner1.svg",
        circle1: "images/circle_selected.svg",
        circle2: "images/circle_grey.svg",
        circle3: "images/circle_grey.svg",
        circleId: "circle1"
    },
    {
        image: "images/banner2.svg",
        circle1: "images/circle_grey.svg",
        circle2: "images/circle_selected.svg",
        circle3: "images/circle_grey.svg",
        circleId: "circle2"
    },
    {
        image: "images/banner3.svg",
        circle1: "images/circle_grey.svg",
        circle2: "images/circle_grey.svg",
        circle3: "images/circle_selected.svg", 
        circleId: "circle3"
    },
]

const image = document.getElementById("banner-img")
const circle1 = document.getElementById("circle1")
const circle2 = document.getElementById("circle2")
const circle3 = document.getElementById("circle3")

const setEntity = (index) => {
    image.src = entities[index].image
    circle1.src = entities[index].circle1
    circle2.src = entities[index].circle2
    circle3.src = entities[index].circle3
}

let currentIndex = 0

const allCircleButtons = document.querySelectorAll(".button-round")

const circleButtonClick = (index) => {
    const allCircleImg = document.querySelectorAll(".circle")
    const circleId = entities[index].circleId
    allCircleImg.forEach( circleImg => {
        circleImg.src = "images/grey_circle.svg"
    })

    const selectedCircle = document.getElementById(circleId)
    selectedCircle.src = "images/selected_circle.svg"
}


allCircleButtons.forEach(button => {
    button.addEventListener("click", () =>{
        const buttonIndex = button.getAttribute("data-index")
        circleButtonClick(parseInt(buttonIndex))
        setEntity(buttonIndex)
    })
})


// 5 sec timer change
const images = [
    'images/banner1.svg',
    'images/banner2.svg',
    'images/banner3.svg'
];

const circles = [
    document.getElementById('circle1'),
    document.getElementById('circle2'),
    document.getElementById('circle3')
];


let currentImageIndex = 0

function changeImage() {
    const imgElement = document.getElementById('banner-img')
    currentImageIndex = (currentImageIndex + 1) % images.length
    imgElement.src = images[currentImageIndex]

    for (let i = 0; i < circles.length; i++) {
        if (i === currentImageIndex) {
            console.log(i)
            circles[i].src = 'images/circle_selected.svg';
        } else {
            circles[i].src = 'images/circle_grey.svg';
        }
    }
    
}

setInterval(changeImage, 5000);





