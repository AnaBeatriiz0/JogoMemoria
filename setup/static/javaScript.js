const pokemonImagens = [
  'Ivysaur.png',
  'Charmander.png',
  'Squirtle.png',
  'Pikachu.png',
  'Pidgey.png',
  'Meowth.png',
];

let shuffledPokemonImagens;
let flippedCards = [];
let flippedCount = 0;
let attempts = 0;
let tempoInicio;

const gameContainer = document.getElementById('game-container');
const attemptsDisplay = document.getElementById('attempts');
const tentativasInput = document.getElementById('tentativas');
const nomeJogadorInput = document.getElementById('nome_jogador');
const formNomeJogador = document.getElementById('form-nome-jogador');

document.getElementById('start-button').addEventListener('click', () => {
  const nomeJogador = nomeJogadorInput.value.trim();
  if (nomeJogador) {
      formNomeJogador.value = nomeJogador; // Salva o nome do jogador no formulário
      initializeGame();
  } else {
      alert('Por favor, insira seu nome.');
  }
});

function initializeGame() {
  // Exibe o jogo e esconde a seção de início
  document.getElementById('start-section').style.display = 'none';
  document.getElementById('attempts').style.display = 'block';
  document.getElementById('game-container').style.display = 'grid'; // Usar grid para organizar cartas

  shuffledPokemonImagens = [...pokemonImagens, ...pokemonImagens].sort(() => Math.random() - 0.5);
  gameContainer.innerHTML = '';
  attempts = 0; 
  flippedCount = 0; 
  tempoInicio = Date.now();
  attemptsDisplay.textContent = `Tentativas: ${attempts}`;

  for (let i = 0; i < shuffledPokemonImagens.length; i++) {
      const card = createCard(i);
      gameContainer.appendChild(card);
  }
}

function createCard(index) {
  const card = document.createElement('div');
  card.classList.add('card');
  card.dataset.index = index;
  card.style.width = '100px'; // Defina a largura da carta
  card.style.height = '100px'; // Defina a altura da carta
  card.style.border = '1px solid #000'; // Adiciona borda
  card.style.display = 'flex';
  card.style.alignItems = 'center';
  card.style.justifyContent = 'center';
  card.style.cursor = 'pointer';
  card.style.margin = '5px';

  const img = document.createElement('img');
  img.src = '/static/imagens/' + shuffledPokemonImagens[index];
  img.style.width = '100%'; // Ajusta a imagem para caber na carta
  img.style.display = 'none'; 

  card.appendChild(img);
  
  card.addEventListener('click', () => flipCard(card, img));
  return card;
}

function flipCard(card, img) {
  if (card.classList.contains('flipped') || flippedCards.length >= 2) return;

  attempts++;
  attemptsDisplay.textContent = `Tentativas: ${attempts}`;
  tentativasInput.value = attempts;

  card.classList.add('flipped');
  img.style.display = 'block'; 
  flippedCards.push({ card, img });

  if (flippedCards.length === 2) {
      setTimeout(checkMatch, 500);
  }
}

function checkMatch() {
  const [firstCard, secondCard] = flippedCards;
  if (firstCard.img.src === secondCard.img.src) {
      flippedCount += 2;
      firstCard.card.removeEventListener('click', () => flipCard(firstCard.card, firstCard.img));
      secondCard.card.removeEventListener('click', () => flipCard(secondCard.card, secondCard.img));
  } else {
      firstCard.img.style.display = 'none'; 
      secondCard.img.style.display = 'none';
      firstCard.card.classList.remove('flipped');
      secondCard.card.classList.remove('flipped');
  }

  flippedCards = [];

  if (flippedCount === shuffledPokemonImagens.length) {
      const tempoFinal = Math.floor((Date.now() - tempoInicio) / 1000);
      document.getElementById('tempo').value = tempoFinal; 
      alert('Parabéns! Você encontrou todos os pares!');
      document.getElementById('result-form').submit(); 
  }
}


