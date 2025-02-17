let kittens = []
/**
 * Called when submitting the new Kitten Form
 * This method will pull data from the form
 * use the provided function to give the data an id
 * then add that data to the kittens list.
 * Then reset the form
 */
function addKitten(event) {
  event.preventDefault()
  let form = event.target

  let kitten = {
    id: generateId(),
    name: form.name.value,
    mood: "Tolerant",
    affection: 5,
  }

  // This code finds kittens with the same name and does not allow a
  //duplicate to be submitted
  let Duplicate = kittens.find((kitten) => kitten.name === form.name.value);
  if (Duplicate) {
    console.log("Kitten already exists!");
    { alert("Kitten already exists!") }

    return;
  }


  console.log(kitten);

  kittens.push(kitten)
  saveKittens()
  form.reset()
  drawKittens()
}


/**
 * Converts the kittens array to a JSON string then
 * Saves the string to localstorage at the key kittens 
 */
function saveKittens() {
  window.localStorage.setItem("kittens", JSON.stringify(kittens))
  drawKittens()

}

/**
 * Attempts to retrieve the kittens string from localstorage
 * then parses the JSON string into an array. Finally sets
 * the kittens array to the retrieved array
 */
function loadKittens() {
  let storedKittens = JSON.parse(window.localStorage.getItem
    ("kittens"))
  if (storedKittens) {
    kittens = storedKittens
  }
}

/**
 * Draw all of the kittens to the kittens element
 */

function drawKittens() {
  loadKittens()
  let kittenListElement = document.getElementById("kittens")
  let kittensTemplate = ""
  kittens.forEach(kitten => {
    kittensTemplate += `
    <div class="cat-border bg-dark kitten ${kitten.mood} text-light">
      <img class="kitten" src="small-cat.png"${kitten.name}size=200x200">
      <div class="d-flex justify-content-center">Name: ${kitten.name}</div>
      <div class="d-flex justify-content-center">Mood: ${kitten.mood}</div>
      <div class="d-flex justify-content-center">Affection: ${kitten.affection}</div>
      <div class="d-flex space-between"></div>
      <button class="btn-cancel m-3" onclick="pet('${kitten.id}')">Pet</button>
      <button class="m-1" onclick="catnip('${kitten.id}')">Catnip</button>
    </div>
    `
  })
  kittenListElement.innerHTML = kittensTemplate
}


/**
 * Find the kitten in the array by its id
 * @param {string} id 
 * @return {Kitten}
 */


function findKittenById(id) {
  return kittens.find(kitten => kitten.id == id)
}


/**
 * Find the kitten in the array of kittens
 * Generate a random Number
 * if the number is greater than .5 
 * increase the kittens affection
 * otherwise decrease the affection
 * @param {string} id 
 */
function pet(id) {
  let Kitten = findKittenById(id)
  let randomNumber = Math.random()
  if (randomNumber > .5) {
    Kitten.affection++;
    setKittenMood(Kitten)
    saveKittens()

  }
  else Kitten.affection--;
  setKittenMood(Kitten)
  saveKittens()
}

/**
 * Find the kitten in the array of kittens
 * Set the kitten's mood to tolerant
 * Set the kitten's affection to 5
 * @param {string} id
 */
function catnip(id) {
  let Kitten = findKittenById(id)
  Kitten.mood = "Tolerant"
  Kitten.affection = 5
  saveKittens()

}

/**
 * Sets the kittens mood based on its affection
 * @param {Kitten} kitten 
 */
function setKittenMood(Kitten) {
  document.getElementById("kittens").classList.remove(Kitten.mood)
  if (Kitten.affection >= 8) { Kitten.mood = "Happy" }
  if (Kitten.affection <= 5) { Kitten.mood = "Tolerant" }
  if (Kitten.affection <= 3) { Kitten.mood = "Angry" }
  if (Kitten.affection <= 0) { Kitten.mood = "Gone" }

  document.getElementById("kittens").classList.add(Kitten.mood)
  saveKittens()
}

/**
 * Removes all of the kittens from the array
 * remember to save this change
 */
function clearKittens(kittenId) {
  let removeKitten = kittens
  kittens = kittens.filter(kittenId => kittenId !== kittenId)
  saveKittens()
}

/**
 * Removes the welcome content and should probably draw the
 * list of kittens to the page. Good Luck
 */
function getStarted() {
  document.getElementById("welcome").remove();
  console.log('Good Luck, Take it away')
  document.getElementById("submit-name").classList.remove("hidden")
  drawKittens()
}


// --------------------------------------------- No Changes below this line are needed

/**
 * Defines the Properties of a Kitten
 * @typedef {{name: string, mood: string, affection: number}} Kitten
 */


/**
 * Used to generate a random string id for mocked
 * database generated Id
 * @returns {string}
 */
function generateId() {
  return Math.floor(Math.random() * 10000000) + "-" + Math.floor(Math.random() * 10000000)
}

loadKittens();
