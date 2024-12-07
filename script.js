/* General styles */
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
  color: #333; /* Default text color */
  position: relative;
  overflow: hidden; /* Prevent scrolling of background */
}

/* Background container */
.background {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url('./images/spoonLabs__cool.png') no-repeat center center fixed;
  background-size: 120%; /* Adjust size as needed */
  opacity: 0.4; /* Adjust opacity */
  z-index: -1; /* Ensure it stays behind all content */
  pointer-events: none; /* Prevent interaction with the background */
}

/* Header styles */
header {
  background-color: #333;
  display: flex;
  justify-content: center; /* Center the logo horizontally */
  padding: 1rem;
}

.header-content {
  display: flex;
  align-items: center;
}

.header-logo {
  height: 100px; /* Adjust as needed for visibility */
  width: auto;
}

/* Navigation styles */
nav {
  background-color: #444;
  padding: 0.75rem 1rem;
  text-align: center;
}

nav a {
  color: white;
  margin: 0 1.5rem;
  text-decoration: none;
  font-weight: bold;
  font-size: 1.1rem;
}

nav a:hover {
  text-decoration: underline;
}

/* Main content styles */
main {
  padding: 2rem;
  text-align: center;
}

main p {
  font-size: 1.25rem;
  color: #444;
}

/* Footer styles */
footer {
  text-align: center;
  padding: 1rem;
  background-color: #333;
  color: white;
  position: relative;
  bottom: 0;
  width: 100%;
}
