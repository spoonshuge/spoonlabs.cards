// Sample inventory data (to be replaced with your spreadsheet data)
const inventory = [
  { image: 'card1.jpg', description: 'Card 1 Description', price: '$10' },
  { image: 'card2.jpg', description: 'Card 2 Description', price: '$20' },
  { image: 'card3.jpg', description: 'Card 3 Description', price: '$15' },
];

// Dynamically populate cards
const cardsContainer = document.getElementById('cards');

inventory.forEach(item => {
  const card = document.createElement('div');
  card.className = 'card';

  card.innerHTML = `
    <img src="${item.image}" alt="${item.description}">
    <div class="description">${item.description}</div>
    <div class="price">${item.price}</div>
  `;

  cardsContainer.appendChild(card);
});
