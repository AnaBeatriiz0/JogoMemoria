const pokemonImagens = [
    'Ivysaur.png',
    'Charmander.png',
    'Squirtle.png',
    'Pikachu.png',
    'Pidgey.png',
    'Meowth.png',
  ];
  
  let shuffledPokemonImagens = [...pokemonImagens, ...pokemonImagens].sort(() => Math.random() - 0.5);
  let flippedCards = [];
  let flippedCount = 0;
  let attempts = 0;
  
  const gameContainer = document.getElementById('game-container');
  const attemptsDisplay = document.getElementById('attempts');

  function createCard(index) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.index = index;
    const img = document.createElement('img');
    img.src = '/static/imagens/' + shuffledPokemonImagens[index]; 
    card.appendChild(img);
    card.addEventListener('click', () => flipCard(card));
    return card;
  }
  
  function flipCard(card) {
    if (card.classList.contains('flipped') || flippedCards.length >= 2) return;

    attempts++;
    attemptsDisplay.textContent = `Tentativas: ${attempts}`;

    card.classList.add('flipped');
    const index = parseInt(card.dataset.index);
    flippedCards.push({ card, index });

    if (flippedCards.length === 2) {
        setTimeout(checkMatch, 500);
    }
}


  
  function checkMatch() {
    const [firstCard, secondCard] = flippedCards;
    if (shuffledPokemonImagens[firstCard.index] === shuffledPokemonImagens[secondCard.index]) {
      flippedCount += 2;
      firstCard.card.removeEventListener('click', () => flipCard(firstCard.card));
      secondCard.card.removeEventListener('click', () => flipCard(secondCard.card));
    } else {
      firstCard.card.classList.remove('flipped');
      secondCard.card.classList.remove('flipped');
    }
  
    flippedCards = [];
  
    if (flippedCount === shuffledPokemonImagens.length) {
      alert('Parabéns! Você encontrou todos os pares!');
    }
  }
  
  function initializeGame() {
    gameContainer.innerHTML = '';
    attempts = 0; 
    attemptsDisplay.textContent = `Tentativas: ${attempts}`;
    for (let i = 0; i < shuffledPokemonImagens.length; i++) {
      const card = createCard(i);
      gameContainer.appendChild(card);
    }
  }

initializeGame();
  