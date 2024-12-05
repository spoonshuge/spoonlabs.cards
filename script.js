const appId = 'DanielRo-spoonlab-SBX-989618c6b-34e2a805'; // Replace with your eBay App ID
const ebayUrl = `https://svcs.ebay.com/services/search/FindingService/v1?OPERATION-NAME=findItemsAdvanced&SECURITY-APPNAME=${appId}&RESPONSE-DATA-FORMAT=JSON&REST-PAYLOAD&sellerId=spoonlabs&outputSelector=PictureURLSuperSize`;

fetch(ebayUrl)
  .then(response => response.json())
  .then(data => {
    const items = data.findItemsAdvancedResponse[0].searchResult[0].item;
    const listingsDiv = document.getElementById('ebay-listings');

    items.forEach(item => {
      const listing = document.createElement('div');
      listing.className = 'listing';

      listing.innerHTML = `
        <img src="${item.galleryURL[0]}" alt="${item.title[0]}">
        <p>${item.title[0]}</p>
        <p>Price: ${item.sellingStatus[0].currentPrice[0].__value__} ${item.sellingStatus[0].currentPrice[0]['@currencyId']}</p>
      `;

      listingsDiv.appendChild(listing);
    });
  })
  .catch(error => console.error('Error fetching eBay listings:', error));
