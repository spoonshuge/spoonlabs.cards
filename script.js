// Replace with your published CSV link from the Google Sheet
// Example: const googleSheetCSVUrl = 'https://docs.google.com/spreadsheets/d/xxxxxxxxx/pub?output=csv';
const googleSheetCSVUrl = 'YOUR_PUBLISHED_CSV_LINK';

const cardsContainer = document.getElementById('cards');

Papa.parse(googleSheetCSVUrl, {
  download: true,
  header: true,
  complete: function(results) {
    const inventory = results.data; 
    populateCards(inventory);
  }
});

function populateCards(inventory) {
  cardsContainer.innerHTML = '';
  inventory.forEach(item => {
    // Expecting columns: "Card Title", "Price", "Link", "Image"
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <a href="${item.Link}" target="_blank" style="display:block;">
        <img src="${item.Image}" alt="${item['Card Title']}">
      </a>
      <div class="description">${item['Card Title']}</div>
      <div class="price">${item.Price}</div>
    `;
    cardsContainer.appendChild(card);
  });
}
