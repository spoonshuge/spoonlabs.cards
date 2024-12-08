const proxyURL = "https://cors-anywhere.herokuapp.com/";
const sheetURL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vR2PdmYo8j5tS_HaLmN_3F9fWKRQEYGEljIFPtCGu9N0z6J0PqulTYzEwQmynRMR6lcOfo2ppu88jm1/pub?gid=0&single=true&output=csv";

fetch(sheetURL)
    .then((response) => response.text())
    .then((data) => {
        // Same parsing and processing as before
        const rows = data.split("\n").slice(1);
        const cards = rows.map((row) => {
            const [title, price, link, image] = row.split(",");
            if (!title || !price || !link || !image) return null;
            return { title, price, link, image };
        }).filter(Boolean);

        const cardGrid = document.getElementById("card-grid");
        cards.forEach((card) => {
            const cardElement = document.createElement("div");
            cardElement.className = "card";
            cardElement.innerHTML = `
                <a href="${card.link}" target="_blank">
                    <img src="${card.image}" alt="${card.title}">
                    <div class="card-title">${card.title}</div>
                </a>
            `;
            cardGrid.appendChild(cardElement);
        });
    })
    .catch((error) => {
        console.error("Error fetching card data:", error);
    });
