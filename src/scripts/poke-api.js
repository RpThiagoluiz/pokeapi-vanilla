const pokeAPI = {};

function convertPokeApiDetailToPokemon(pokeDetail) {
  const pokemon = new Pokemon();

  pokemon.name = pokeDetail.name;
  pokemon.number = pokeDetail.id;
  const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name);
  pokemon.types = types;
  pokemon.primaryType = pokemon.types.at(0);
  pokemon.image = pokeDetail.sprites.other.dream_world.front_default;

  return pokemon;
}

pokeAPI.getPokemonsUrls = async (pokemon) => {
  return fetch(pokemon.url)
    .then((pokemonUrl) => pokemonUrl.json())
    .then(convertPokeApiDetailToPokemon);
};

pokeAPI.getPokemons = async (offset = 0, limit = 5) => {
  const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

  return fetch(url)
    .then((response) => response.json())
    .then((jsonBody) => jsonBody.results)
    .then((pokemons) => pokemons.map(pokeAPI.getPokemonsUrls))
    .then((detailsRequest) => Promise.all(detailsRequest))
    .then((pokemonDetails) => pokemonDetails)
    .catch((error) => console.log(error));
};
