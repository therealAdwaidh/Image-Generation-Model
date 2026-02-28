const fs = require('fs');

let content = fs.readFileSync('src/index.css', 'utf8');
let newCss = `
/* Custom Dropdowns */
.custom-dropdown-container {
  position: relative;
  width: 100%;
  margin-top: 0.5rem;
}

.custom-dropdown-button {
  width: 100%;
  padding: 1rem 1.25rem;
  font-size: 1rem;
  background: rgba(15, 23, 42, 0.5);
  border: 1px solid var(--glass-border);
  border-radius: 1rem;
  color: var(--text-primary);
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

.custom-dropdown-button:hover, .custom-dropdown-button.open {
  background: rgba(15, 23, 42, 0.8);
  border-color: var(--accent-color);
  box-shadow: 0 0 0 4px rgba(0, 255, 231, 0.1);
}
.custom-dropdown-button.mood-open {
  border-color: var(--secondary-accent);
  box-shadow: 0 0 0 4px rgba(123, 92, 255, 0.1);
}

.custom-dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  margin-top: 0.5rem;
  background: #111116;
  border: 1px solid var(--glass-border);
  border-radius: 1rem;
  box-shadow: 0 10px 40px rgba(0,0,0,0.8);
  z-index: 100;
  max-height: 250px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  padding: 0.5rem;
}

.custom-dropdown-item {
  width: 100%;
  text-align: left;
  padding: 0.75rem 1rem;
  background: transparent;
  border: none;
  border-radius: 0.5rem;
  color: var(--text-secondary);
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.custom-dropdown-item:hover {
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
}

.custom-dropdown-item.active-style {
  background: rgba(0, 255, 231, 0.15);
  color: var(--accent-color);
}

.custom-dropdown-item.active-mood {
  background: rgba(123, 92, 255, 0.15);
  color: var(--secondary-accent);
}
`;

// Slice before the messy appending
// we find the string "opacity: 0;\r\n  }\r\n}" or similar corresponding to the end of arrow-down
const markerIndex = content.lastIndexOf('@keyframes arrow-down');
const brace1 = content.indexOf('}', markerIndex); // end of 0%
const brace2 = content.indexOf('}', brace1 + 1);    // end of 50%
const brace3 = content.indexOf('}', brace2 + 1);    // end of 100%
const endOfArrowDown = content.indexOf('}', brace3 + 1); // end of @keyframes

let validContent = content.substring(0, endOfArrowDown + 1);

// Just to be extremely safe, we can slice based on splitting by lines as a fallback
if (endOfArrowDown === -1 || validContent.length < 5000) {
    let lines = content.split(/\r?\n/);
    validContent = lines.slice(0, 1809).join('\n');
}

fs.writeFileSync('src/index.css', validContent + '\n' + newCss, 'utf8');
console.log('Fixed CSS encoding issues successfully!');
