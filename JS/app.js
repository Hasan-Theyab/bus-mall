'use strict';
let leftImageElement = document.getElementById('left-image');
let middleImageElement = document.getElementById('middle-image');
let rightImageElement = document.getElementById('right-image');
let imagesDiv = document.getElementById('images-div');

let maxAttempts = 25;
let userAttemptsCounter = 0;

let leftImageIndex;
let middleImageIndex;
let rightImageIndex;



function Product(name, src) {
    this.name = name;
    this.source = src;
    this.votes = 0;
    this.shown = 0;
    Product.all.push(this);
}

Product.all = [];

new Product('bag', 'img/bag.jpg');//0
new Product('banana', 'img/banana.jpg');//1
new Product('bathroom', 'img/bathroom.jpg');//2
new Product('boots', 'img/boots.jpg');//3
new Product('breakfast', 'img/breakfast.jpg');//4
new Product('bubblegum', 'img/bubblegum.jpg');//5
new Product('chair', 'img/chair.jpg');//6
new Product('cthulhu', 'img/cthulhu.jpg');//7
new Product('dog-duck', 'img/dog-duck.jpg');//8
new Product('dragon', 'img/dragon.jpg');//9
new Product('pen', 'img/pen.jpg');//10
new Product('pet-sweep', 'img/pet-sweep.jpg');//11
new Product('scissors', 'img/scissors.jpg');//12
new Product('shark', 'img/shark.jpg');//13
new Product('sweep', 'img/sweep.png');//14
new Product('tauntaun', 'img/tauntaun.jpg');//15
new Product('unicorn', 'img/unicorn.jpg');//16
new Product('water-can', 'img/water-can.jpg');//17
new Product('wine-glass', 'img/wine-glass.jpg');//18

// from w3 schools
function getRandomIndex() {
    return Math.floor(Math.random() * Product.all.length);
}


// render

function renderThreeImages() {
    leftImageIndex = getRandomIndex();
    middleImageIndex = getRandomIndex();
    rightImageIndex = getRandomIndex();

    while (leftImageIndex === rightImageIndex || leftImageIndex === middleImageIndex) {
        rightImageIndex = getRandomIndex();
        middleImageIndex = getRandomIndex();
    }

    leftImageElement.src = Product.all[leftImageIndex].source;
    middleImageElement.src = Product.all[middleImageIndex].source;
    rightImageElement.src = Product.all[rightImageIndex].source;
    Product.all[leftImageIndex].shown++;
    Product.all[middleImageIndex].shown++;
    Product.all[rightImageIndex].shown++;
}

renderThreeImages();

imagesDiv.addEventListener('click', handleUserClick);

function handleUserClick(event) {
   userAttemptsCounter++;
    if (userAttemptsCounter <= maxAttempts) {
        if (event.target.id === 'left-image') {
            Product.all[leftImageIndex].votes++;
        } else if (event.target.id === 'middle-image') {
            Product.all[middleImageIndex].votes++;
        } else if (event.target.id === 'right-image') {
            Product.all[rightImageIndex].votes++;
        } else {
            alert('Please, click only on an image');
        }
        
        renderThreeImages();
    } else {
        let buttonDiv = document.getElementById('button-div');
        let finalResultButton = document.createElement('button');
        buttonDiv.appendChild(finalResultButton);
        finalResultButton.textContent = 'View Results';
        finalResultButton.addEventListener('click', handleButtonClick);
        function handleButtonClick(event) {
            let list = document.getElementById('results-list');
            for (let i = 0; i < Product.all.length; i++) {
                let listItem = document.createElement('li');
                list.appendChild(listItem);
                listItem.textContent = `${Product.all[i].name} had ${Product.all[i].votes} votes, and was seen ${Product.all[i].shown} times.`
            }
            finalResultButton.removeEventListener('click', handleButtonClick);
        }
        // remove event listener:

        imagesDiv.removeEventListener('click', handleUserClick);
    }
    
}

