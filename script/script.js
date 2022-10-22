let initialNumber = 0;
let cardsFlipped = 0;
let cardsSelected = [];
let timerElement = 0;
let interval;
const cardsContainer = document.querySelector('.cardsContainer');

const timer = () => {
  const title = document.querySelector('.title');

  const counter = document.createElement('h3');
  counter.classList.add('counter');
  title.appendChild(counter);

  interval = setInterval(() => {
    timerElement += 1;
    counter.innerHTML = `Tempo: ${timerElement}`;
  }, 1000);
};

const initialGameConfig = () => {
  const text = 'Com quantas cartas quer começar? Escolha um número par de 4 a 14';
  let cardNumber = prompt(text);

  while (cardNumber % 2 !== 0 || (cardNumber < 4 || cardNumber > 14)) {
    cardNumber = prompt(text);
  }
  initialNumber = cardNumber;
};

const cardCreator = () => {
  for (let index = 0; index < initialNumber; index += 1) {
    const cardContainer = document.createElement('div');
    const front = document.createElement('div');
    const back = document.createElement('div');

    cardContainer.classList.add('card');
    back.classList.add('back');
    back.classList.add('face');
    front.classList.add('front');
    front.classList.add('face');

    cardContainer.appendChild(back);
    cardContainer.appendChild(front);

    back.setAttribute('id', index);

    cardContainer.addEventListener('click', handleClick);

    cardsContainer.appendChild(cardContainer);
  }
};

const setBackground = () => {
  const cards = Array.from(document.querySelectorAll('.back'));

  const backgrounds = [
    'bobrossparrot',
    'explodyparrot',
    'fiestaparrot',
    'metalparrot',
    'revertitparrot',
    'tripletsparrot',
    'unicornparrot'
  ];

  let nameIndex = 0;
  let cardIndex = nameIndex;

  for (nameIndex; nameIndex < cards.length / 2; nameIndex += 1) {
    cards[cardIndex].classList.add(backgrounds[nameIndex]);
    cards[cardIndex + 1].classList.add(backgrounds[nameIndex]);
    cardIndex += 2;
  }
};

const randomizeCards = () => {
  const cards = Array.from(document.querySelectorAll('.card'));
  const randomized = cards.sort(() => Math.random() - 0.5);
  cards.map((card) => card.remove());
  randomized.map((card) => cardsContainer.appendChild(card));
};

const gameOver = () => {
  alert(`Você ganhou em ${cardsFlipped} jogadas e ${timerElement} segundos!`);
  let restart = prompt('Deseja reiniciar a partida?');

  if (restart === 'sim') {
    Array.from(document.querySelectorAll('.card')).map((card) => card.remove());
    document.querySelector('.counter').remove();

    initialGameConfig();
    cardCreator();
    setBackground();
    randomizeCards();
    clearInterval(interval);
    cardsFlipped = 0;
    timerElement = 0;
    timer();
  }
};

const handleClick = ({ target }) => {
  if (target.getAttribute('id') === cardsSelected[0]?.getAttribute('id') || target.className === 'card clicked') {
    return;
  }

  target.parentElement.classList.add('clicked');
  cardsFlipped += 1;
  cardsSelected.push(target.previousElementSibling);

  if (cardsSelected.length === 2) {
    const correct = cardsSelected[0].className === cardsSelected[1].className;

    if (!correct) {
      setTimeout(() => {
        cardsSelected.map((card) => card.parentElement.classList.remove('clicked'));
        cardsSelected = [];
      }, 1000);
    }
    setTimeout(() => {
      cardsSelected = [];
    }, 1000);
  }

  if (document.querySelectorAll('.clicked').length === Number(initialNumber)) {
    setTimeout(() => gameOver(), 1000);
  }
};

window.addEventListener('load', initialGameConfig);
window.addEventListener('load', cardCreator);
window.addEventListener('load', setBackground);
window.addEventListener('load', randomizeCards);
window.addEventListener('load', timer);
