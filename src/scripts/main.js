const htmlPokemonsOl = document.getElementById('pokemons');
const loadMorePokemonsBtn = document.getElementById('loadMorePokemons');

const limit = 5;
let offset = 0;

function loadPokemonItens(offset, limit) {
  pokeAPI
    .getPokemons(offset, limit)
    .then((pokemonList = []) => {
      htmlPokemonsOl.innerHTML += pokemonList
        .map(
          (pokemon) => `
              <li class="pokemon ${pokemon.primaryType}">
                    <div class="header">
                      <span>${pokemon.name}</span>
                      <span>#${pokemon.number}</span>
                    </div>

                    <div>
                      <div class="details">
                        <ol class="types">
                        ${pokemon.types
                          .map(
                            (type) => `<li class="type ${type}">${type}</li>`
                          )
                          .join('')}
                        </ol>

                        <img
                          src="${pokemon.image}"
                          alt="Its image for ${pokemon.name}"
                        />
                      </div>
                    </div>
              </li>
      `
        )
        .join('');
    })
    .catch((error) => console.log(error))
    .finally(() => console.log('Request finish'));
}

loadPokemonItens();

loadMorePokemonsBtn.addEventListener('click', () => {
  offset += limit;
  loadPokemonItens(offset, limit);
});
