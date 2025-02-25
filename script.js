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

// Fetches and displays blog posts
function loadBlogPosts() {
    const blogContainer = document.getElementById('blog-container');
    blogContainer.innerHTML = ''; // Clear existing blog posts

    // List of blog post files, ideally fetched from the server or maintained manually
    const posts = ['2023-02-01-first-post.html', '2023-02-02-second-post.html'];

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
