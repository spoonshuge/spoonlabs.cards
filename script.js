// Replace with your published CSV link from the Google Sheet
const googleSheetCSVUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRFTvzmV1Uq23UTFobTY_Nq0NfQryWsXcKRAw5BB5E6gmJXeaJc8-VcQJ0bFcta2svQCpfx8-AuSt2N/pub?output=csv';

const cardsContainer = document.getElementById('cards');

// Parse the CSV data
Papa.parse(googleSheetCSVUrl, {
  download: true,
  header: true,
  complete: function(results) {
    console.log("Parsed data:", results.data); // Log parsed data to debug
    const inventory = results.data; 
    populateCards(inventory); // Populate cards
  },
  error: function(err) {
    console.error("PapaParse error:", err); // Log parsing errors
  }
});

// Function to populate cards
function populateCards(inventory) {
  cardsContainer.innerHTML = ''; // Clear previous cards
  inventory.forEach(item => {
    if (item['Card Title'] && item.Image && item.Price && item.Link) {
      // Create card only if data is valid
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
    } else {
      console.warn("Skipping invalid item:", item); // Log skipped items
    }
  });
}
