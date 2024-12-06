// Replace with your published CSV link from the Google Sheet
const googleSheetCSVUrl = 'YOUR_PUBLIShttps://docs.google.com/spreadsheets/d/e/2PACX-1vRFTvzmV1Uq23UTFobTY_Nq0NfQryWsXcKRAw5BB5E6gmJXeaJc8-VcQJ0bFcta2svQCpfx8-AuSt2N/pub?gid=0&single=true&output=csv';

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
    // Assuming columns: "Card Title", "Price", "Link", "Image"
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
