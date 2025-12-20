const POKEMON_API_URL = 'https://pokeapi.co/api/v2/pokemon/';

async function fetchRandomPokemon() {
  try {
    const randomId = Math.floor(Math.random() * 898) + 1; 
    const response = await fetch(`${POKEMON_API_URL}${randomId}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching Pokemon:', error);
    return null;
  }
}


function displayPokemon(pokemon) {
  const container = document.getElementById('pokemon-container');
  
  if (!pokemon) {
    container.innerHTML = '<p>Failed to load Pokemon. Please try again.</p>';
    return;
  }

  const types = pokemon.types.map(type => type.type.name).join(', ');
  const stats = pokemon.stats.map(stat => 
    `<li><strong>${stat.stat.name}:</strong> ${stat.base_stat}</li>`
  ).join('');

  container.innerHTML = `
    <div class="pokemon-card">
      <img src="${pokemon.sprites.other['official-artwork'].front_default}" 
           alt="${pokemon.name}" 
           class="pokemon-image">
      <h3>${pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h3>
      <p><strong>Type:</strong> ${types}</p>
      <p><strong>Height:</strong> ${pokemon.height / 10}m | <strong>Weight:</strong> ${pokemon.weight / 10}kg</p>
      <div class="pokemon-stats">
        <h4>Base Stats:</h4>
        <ul>${stats}</ul>
      </div>
      <button onclick="loadNewPokemon()" class="refresh-btn">Get Random Pokemon</button>
    </div>
  `;
}

async function loadNewPokemon() {
  const container = document.getElementById('pokemon-container');
  container.innerHTML = '<p class="loading">Loading Pokemon...</p>';
  
  const pokemon = await fetchRandomPokemon();
  displayPokemon(pokemon);
}

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('pokemon-container');
  container.innerHTML = `
    <button onclick="loadNewPokemon()" class="start-btn">Show Random Pokemon</button>
  `;
});