const appURL = 'https://pokeapi.co/api/v2/pokemon/';

// Function that generates a random number
function generateNum(max=1000) {
  return Math.floor(Math.random() * max) + 1;
}

// this function retrieves a specific Pokemon specified by the randomNum and displays the new image element on the web page
function getNewPokemon(randomNum) {
    axios.get(appURL + randomNum)
    .then(async response => {
      const imageURL = response.data.sprites.front_default;
      const pokeTypes = await response.data.types[0].type.url
      
      const image = document.createElement('img');
      image.src = imageURL;
      for(let i = 0; i < 5; i++){
        await getPokeByType(pokeTypes)
        
      } 

      // Append the new image element to the body of the web page
      document.getElementById('image').appendChild(image);
    })
}

async function getPokeByType(typeURL){

  const response = await axios.get(typeURL)
  const randomPoke = response.data.pokemon[generateNum(response.data.pokemon.length)].pokemon.url
  const newPoke = await axios.get(randomPoke)
  const image = document.createElement('img');
  
  image.src = newPoke.data.sprites.front_default
  document.getElementById('image').appendChild(image);
  
  console.log(randomPoke)
}


// Add an event listener to the button, generate a new number on 'click' and call the getNewPokemon function with the newly generated number.                                       
document.addEventListener('DOMContentLoaded', () => {
  const button = document.getElementById('btn');
  button.addEventListener('click', () => {
    const randomNum = generateNum();
    const pokes = document.getElementById('image')
    
    while(pokes.hasChildNodes()){
      console.log(pokes.firstChild)
      pokes.removeChild(pokes.firstChild)
      
    }
    console.log(pokes.hasChildNodes())
    getNewPokemon(randomNum);
  });
});





