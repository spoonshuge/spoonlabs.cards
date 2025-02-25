const proxyURL = "https://cors-anywhere.herokuapp.com/";
const sheetURL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vR2PdmYo8j5tS_HaLmN_3F9fWKRQEYGEljIFPtCGu9N0z6J0PqulTYzEwQmynRMR6lcOfo2ppu88jm1/pub?gid=0&single=true&output=csv";

fetch(sheetURL)
    .then((response) => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.text();
    })
    .then((data) => {
        const rows = data.split("\n").slice(1); // Skip header row
        const cards = rows.map((row) => {
            const [title, price, link, image] = row.split(",");
            if (!title || !price || !link || !image) return null; // Skip invalid rows
            return { title, price, link, image };
        }).filter(Boolean); // Remove null entries

        const cardGrid = document.getElementById("card-grid");
        cards.forEach((card) => {
            const cardElement = document.createElement("div");
            cardElement.className = "card";
            cardElement.innerHTML = `
                <a href="${card.link}" target="_blank" rel="noopener noreferrer">
                    <img src="${card.image}" alt="${card.title}">
                    <div class="card-title">${card.title}</div>
                </a>
            `;
            cardGrid.appendChild(cardElement);
        });
    })
    .catch((error) => {
        console.error("Error fetching card data:", error);
        const cardGrid = document.getElementById("card-grid");
        cardGrid.innerHTML = `<p style="color: red;">Error loading card data. Please try again later.</p>`;
    });

function loadBlogPosts() {
    const blogContainer = document.getElementById('blog-container');
    blogContainer.innerHTML = '';

    // Start date is today, and we go back 10 days
    let currentDate = new Date();
    const endDate = new Date();
    endDate.setDate(currentDate.getDate() - 10);

    // Loop from today back to 10 days ago
    while (currentDate >= endDate) {
        // Format the date to YYYY-MM-DD
        const dateStr = currentDate.toISOString().slice(0, 10);
        // Try to load two posts per day
        for (let i = 1; i <= 2; i++) {
            let filename = `${dateStr}-0${i}.html`;
            fetch(`/blog/${filename}`)
                .then(response => {
                    if (!response.ok) throw new Error('Post not found');
                    return response.text();
                })
                .then(html => {
                    const postElement = document.createElement('div');
                    postElement.innerHTML = html;
                    blogContainer.appendChild(postElement);
                })
                .catch(error => {
                    console.log(`Post not found: ${filename}, skipping...`);
                });
        }
        // Go to the previous day
        currentDate.setDate(currentDate.getDate() - 1);
    }
}

// Add this to ensure the blog posts load when the page does
window.onload = loadBlogPosts;
