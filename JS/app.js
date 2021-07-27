/* eslint-disable no-var */
/* eslint-disable no-unused-vars */
/* eslint-disable no-inner-declarations */
'use strict';
let leftImageElement = document.getElementById('left-image');
let middleImageElement = document.getElementById('middle-image');
let rightImageElement = document.getElementById('right-image');
let imagesDiv = document.getElementById('images-div');

let maxAttempts = 5;
let userAttemptsCounter = 0;

let leftImageIndex;
let middleImageIndex;
let rightImageIndex;

let namesArr = [];

let votesArr = [];

let shownArr = [];

function Product(name, src) {
  this.name = name;
  this.source = src;
  this.votes = 0;
  this.shown = 0;
  Product.all.push(this);
  namesArr.push(this.name);
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

function updateStorage() {
  let stringArr = JSON.stringify(Product.all);
  localStorage.setItem('Product', stringArr);

}

function getProductVotes() {
  let data = localStorage.getItem('Product');
  let parsedArr = JSON.parse(data);
  if (parsedArr !== null) {
    // reinstantiation
    for (let i = 0; i < parsedArr.length; i++) {
      // name, src,votes,shown
      new Product(parsedArr[i].name, parsedArr[i].source,parsedArr[i].vote,parsedArr[i].shown);
    }
  }
  renderThreeImages();
}


// from w3 schools
function getRandomIndex() {
  return Math.floor(Math.random() * Product.all.length);
}


// render

let shownPictures = [];

function renderThreeImages() {
  leftImageIndex = getRandomIndex();
  middleImageIndex = getRandomIndex();
  rightImageIndex = getRandomIndex();


  while (leftImageIndex === rightImageIndex || leftImageIndex === middleImageIndex || rightImageIndex === middleImageIndex || shownPictures.includes(leftImageIndex) || shownPictures.includes(middleImageIndex) || shownPictures.includes(rightImageIndex)) {
    leftImageIndex = getRandomIndex();
    rightImageIndex = getRandomIndex();
    middleImageIndex = getRandomIndex();
  }

  shownPictures = [leftImageIndex, middleImageIndex, rightImageIndex];

  leftImageElement.src = Product.all[leftImageIndex].source;
  Product.all[leftImageIndex].shown++;
  middleImageElement.src = Product.all[middleImageIndex].source;
  Product.all[middleImageIndex].shown++;
  rightImageElement.src = Product.all[rightImageIndex].source;
  Product.all[rightImageIndex].shown++;
}

renderThreeImages();

imagesDiv.addEventListener('click', handleUserClick);

function handleUserClick(event) {

  if (userAttemptsCounter < maxAttempts) {
    if (event.target.id === 'left-image') {
      Product.all[leftImageIndex].votes++;
      renderThreeImages();
    } else if (event.target.id === 'middle-image') {
      Product.all[middleImageIndex].votes++;
      renderThreeImages();
    } else if (event.target.id === 'right-image') {
      Product.all[rightImageIndex].votes++;
      renderThreeImages();
    } else {
      alert('Please, click only on an image');
      userAttemptsCounter--;
    }


  } else {
    let buttonDiv = document.getElementById('button-div');
    let finalResultButton = document.createElement('button');
    buttonDiv.appendChild(finalResultButton);
    finalResultButton.textContent = 'View Results';
    finalResultButton.addEventListener('click', handleButtonClick);
    // eslint-disable-next-line no-unused-vars
    function handleButtonClick(event) {
      let list = document.getElementById('results-list');
      for (let i = 0; i < Product.all.length; i++) {
        let listItem = document.createElement('li');
        list.appendChild(listItem);
        listItem.textContent = `${Product.all[i].name} had ${Product.all[i].votes} votes, and was seen ${Product.all[i].shown} times.`;
      }
      finalResultButton.removeEventListener('click', handleButtonClick);
    }
    for (let i = 0; i < Product.all.length; i++) {
      votesArr.push(Product.all[i].votes);
      shownArr.push(Product.all[i].shown);

    }
    imagesDiv.removeEventListener('click', handleUserClick);
    updateStorage();  
    showChart();
  }
  userAttemptsCounter++;
}

function showChart() {
  const data = {
    labels: namesArr,
    datasets: [{
      label: 'Votes',
      data: votesArr,
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(255, 205, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(201, 203, 207, 0.2)'
      ],
      borderColor: [
        'rgb(255, 99, 132)',
        'rgb(255, 159, 64)',
        'rgb(255, 205, 86)',
        'rgb(75, 192, 192)',
        'rgb(54, 162, 235)',
        'rgb(153, 102, 255)',
        'rgb(201, 203, 207)'
      ],
      borderWidth: 1
    },
    {
      label: 'Shown',
      data: shownArr,
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(255, 205, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(201, 203, 207, 0.2)'
      ],
      borderColor: [
        'rgb(255, 99, 132)',
        'rgb(255, 159, 64)',
        'rgb(255, 205, 86)',
        'rgb(75, 192, 192)',
        'rgb(54, 162, 235)',
        'rgb(153, 102, 255)',
        'rgb(201, 203, 207)'
      ],
      borderWidth: 1
    }

    ]
  };

  const config = {
    type: 'bar',
    data: data,
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    },
  };


  // eslint-disable-next-line no-undef
  var myChart = new Chart(
    document.getElementById('myChart'),
    config
  );

}

getProductVotes();

