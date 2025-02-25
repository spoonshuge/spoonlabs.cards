const proxyURL = "https://cors-anywhere.herokuapp.com/";
const sheetURL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vSb9Zpo5dnvCaVC0xS4tz6eWjv-fbT3ryuJuVAnypu2gBys3t_Djn3otlmHHjdTKJ5K-iXgLWQDcB3B/pub?gid=0&single=true&output=csv";

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
            const [price, card, PicURLF, PicURLB] = row.split(",");
            if (!price || !card || !PicURLF) return null; // Skip invalid rows
            return { title: card, price, image: `${PicURLB}` };
        }).filter(Boolean); // Remove null entries

        const cardGrid = document.getElementById("card-grid");
        cards.forEach((card) => {
            const cardElement = document.createElement("div");
            cardElement.className = "card";
            cardElement.innerHTML = `
                <a href="${card.image}" target="_blank" rel="noopener noreferrer">
                    <img src="${card.image}" alt="${card.title}">
                    <div class="card-title">${card.title}</div>
                    <div class="card-price">$${card.price}</div>
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

// Fetches and displays blog posts
function loadBlogPosts() {
    const blogContainer = document.getElementById('blog-container');
    blogContainer.innerHTML = ''; // Clear existing blog posts

    // List of blog post files, ideally fetched from the server or maintained manually
    const posts = ['2025-02-24-01.html'];

    // Sort posts by date, assuming filenames contain the date
    posts.sort().reverse().forEach(post => {
        fetch(`/blog/${post}`)
            .then(response => response.text())
            .then(html => {
                const postElement = document.createElement('div');
                postElement.innerHTML = html;
                blogContainer.appendChild(postElement);
            });
    });
}

// Call this function when the page loads
window.onload = loadBlogPosts;
