const htmlPokemonsOl = document.getElementById('pokemons');

function convertPokemonToHtmlLi(pokemon) {
  return `
    <li class="pokemon">
          <div class="header">
            <span>${pokemon.name}</span>
            <span>#001</span>
          </div>

          <div>
            <div class="details">
              <ol class="types">
                <li class="type">Grass</li>
                <li class="type">Poison</li>
              </ol>

              <img
                src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg"
                alt="${pokemon.name}"
              />
            </div>
          </div>
    </li>
  `;
}

pokeAPI
  .getPokemons()
  .then((pokemonList = []) => {
    htmlPokemonsOl.innerHTML += pokemonList
      .map(convertPokemonToHtmlLi)
      .join('');
  })
  .catch((error) => console.log(error))
  .finally(() => console.log('Request finish'));
