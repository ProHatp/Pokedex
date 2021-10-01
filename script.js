const localPokemons = document.querySelector('.local-pokemons');
const localMesage = document.querySelector('.local-mesage');

const inpPesquisar = document.querySelector('#pesquisar-poke');
const btnPesquisar = document.querySelector('#btn-pesquisar');

const localButtonCarregar = document.querySelector('.button-carregar');
const btnProcurarMais = document.querySelector('#button-carregar-mais');

let contId = 0;
const gerarPokemons = (api) => {
  fetch(api)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      pokemons(data);
    })
    .catch(()=> {
      gerarErro('Pokemon ou ID inválidos');
    });
}

const gerarErro = (frase) => {
  const localMensagem = document.createElement('div');
  localMensagem.className = 'alert alert-danger';
  localMensagem.innerText = frase;
  localMesage.appendChild(localMensagem);
}

const iniciarPokedex = (valor) => {
  let valorPassado = valor + 20;
  for (let i = valor + 1; i <= valorPassado; i += 1) {
    if (i <= 898) {
      const api = `https://pokeapi.co/api/v2/pokemon/${i}`;
      gerarPokemons(api);
      contId = valorPassado;
    }
  }
}
iniciarPokedex(contId);

btnProcurarMais.addEventListener('click', () => {
  iniciarPokedex(contId);
});

btnPesquisar.addEventListener('click', () => {
  localPokemons.innerHTML = '';
  localButtonCarregar.innerHTML = '';
  const api = `https://pokeapi.co/api/v2/pokemon/${inpPesquisar.value.toLowerCase()}`;
  gerarPokemons(api);
  inpPesquisar.value = '';
});

inpPesquisar.addEventListener('keyup', () => {
  localPokemons.innerHTML = '';
  const api = `https://pokeapi.co/api/v2/pokemon/${inpPesquisar.value.toLowerCase()}`;
  gerarPokemons(api);
});

const pokemons = (data) => {
  let pokemon = data['name'];
  let id = data['id'];
  let imagePokemon = data['sprites']['front_default'];
  let tipos = data['types']['0']['type']['name'];
  if (data['types']['1'] != null) {
    tipos += ` ${data['types']['1']['type']['name']}`;
  }
  createUXPokemons(id, pokemon, imagePokemon, tipos);
}

const createUXPokemons = (idpokemon, namePokemon, imgPokemon, tipos) => {
  localMesage.innerHTML = '';
  let tiposElementos = tipos.split(' ');

  const divPokemon = document.createElement('div');
  divPokemon.className = 'pokemon';
  localPokemons.appendChild(divPokemon);

  const imgUXPokemon = document.createElement('img');
  imgUXPokemon.className = 'poke-img'
  imgUXPokemon.setAttribute('src', imgPokemon);
  divPokemon.appendChild(imgUXPokemon);

  const localTextos = document.createElement('div');
  localTextos.className = 'local-textos';
  divPokemon.appendChild(localTextos);

  const idDoPokemon = document.createElement('h3');
  idDoPokemon.className = 'id-pokemon';
  idDoPokemon.innerText = `Nº${idpokemon}`;
  localTextos.appendChild(idDoPokemon);

  const nomePokemon = document.createElement('h1');
  nomePokemon.innerHTML = namePokemon.toUpperCase();
  localTextos.appendChild(nomePokemon);

  const localElementos = document.createElement('div');
  localElementos.className = 'local-elementos';
  divPokemon.appendChild(localElementos);

  for (let i of tiposElementos) {
    const localElemento = document.createElement('p');
    imgUXPokemon.classList.add(`back-${i}`);
    localElemento.className = i;
    localElemento.innerText = i.toUpperCase();
    localElementos.appendChild(localElemento);
  }
}
