var div_id = "";
var h1_id = "";

$(document).ready(function () {
  let random = randomLetters();
  random.length = 20;
  let characters = random.join("");
  let j = 0;
  for (let i = 0; i < 20; i++) {
    $("#random-letter" + i + "").text(characters.charAt(j));
    j++;
  }
});

function getRandomNumber(min, max) {
  let totalEle = max - min + 1;
  let result = Math.floor(Math.random() * totalEle) + min;
  return result;
}

function createArrayOfNumber(start, end) {
  let myArray = [];
  for (let i = start; i <= end; i++) {
    myArray.push(i);
  }
  return myArray;
}

let numbersArray = createArrayOfNumber(0, 22);

function getRandomNumberFromArray() {
  if (numbersArray.length === 0) {
    console.log("No more random number");
  }
  let randomIndex = getRandomNumber(0, numbersArray.length - 1);
  let randomNumber = numbersArray[randomIndex];
  numbersArray.splice(randomIndex, 1);
  return randomNumber;
}

function randomLetters() {
  const letters = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
  ];
  var nums = [];
  var random = [];
  for (let index = 0; index < 23; index++) {
    nums.push(getRandomNumberFromArray());
  }
  for (let index = 0; index < nums.length; index++) {
    random.push(letters[nums[index]]);
  }
  return random;
}

async function selectLetter(element) {
  div_id = element.id;
  setTimeout(() => {
    document.getElementById("check-div").innerHTML = `
    <button class="true" onclick="correctAns()"><i class="fas fa-check"></i></button>
    <button class="reset" onclick="reset()"><i class="fas fa-sync-alt"></i></button>
    <button class="false" onclick="wrongAns()"><i class="fas fa-times"></i></i></button>`;
  }, 1000);
  document.getElementById("check-div").innerHTML = ``;
  let div_letter = document.getElementById(div_id);
  h1_id = div_letter.children[0].innerHTML;
  // console.log(h1_id);
  await fetch("../assets/palabras.json")
    .then((response) => response.json())
    .then((data) => {
      const res = data.filter((D) => D.letra === h1_id);
      let element = res[Math.floor(Math.random() * res.length)].definicion;
      let spinner = document.getElementById("semipolar-spinner");
      setTimeout(() => {
        spinner.style.display = "none";
        document.getElementById("show").style.display = "block";
        document.getElementById("show").innerHTML = element;
      }, 1000);
      spinner.style.display = "";
      document.getElementById("show").style.display = "";
      // console.log(res[Math.floor(Math.random() * res.length)]);
    });
}

function correctAns() {
  let id = div_id;
  let div = document.getElementById(id);
  div.style.background = "#46db46";
}

function wrongAns() {
  let id = div_id;
  let div = document.getElementById(id);
  div.style.background = "#ff3232";
}

function reset() {
  let id = div_id;
  let div = document.getElementById(id);
  div.style.background = "";
}
