const fs = require('fs');
let css = fs.readFileSync('client/src/index.css', 'utf8');

const oldSection = css.substring(
  css.indexOf('.result-area {\r\n'), 
  css.indexOf('.generated-image-container {\r\n')
);

const newSection = `.result-area {
  margin-top: 0rem;
  text-align: left;
}

.result-container {
  margin-bottom: 2rem;
}

.result-content {
  background: rgba(255, 255, 255, 0.03);
  padding: 1.5rem;
  border-radius: 16px;
  border: 1px solid rgba(0, 255, 231, 0.2);
  color: var(--text-primary);
  line-height: 1.6;
  font-family: var(--font-primary);
  box-shadow: inset 0 0 20px rgba(0, 255, 231, 0.05);
  position: relative;
  overflow: hidden;
  white-space: pre-wrap;
}

.copy-btn-subtle {
  background: rgba(0, 0, 0, 0.2);
  padding: 0.25rem 0.75rem;
  border-radius: 6px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.copy-btn-subtle:hover {
  background: rgba(255, 255, 255, 0.05);
}

.visualize-btn-large {
  width: 100%;
  background: rgba(15, 23, 42, 0.4);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(168, 85, 247, 0.4);
  color: #d8b4fe;
  padding: 1.25rem 2rem;
  border-radius: 16px;
  font-family: var(--font-mono);
  font-size: 1.15rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  box-shadow: 0 0 15px rgba(168, 85, 247, 0.15) inset, 0 4px 20px rgba(0, 0, 0, 0.3);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  position: relative;
  overflow: hidden;
}

.visualize-btn-large::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg, 
    transparent, 
    rgba(168, 85, 247, 0.1), 
    transparent
  );
  transition: auto;
  animation: shine 3s infinite linear;
}

@keyframes shine {
  0% { left: -100%; }
  100% { left: 100%; }
}

.visualize-btn-large:hover:not(:disabled) {
  background: rgba(168, 85, 247, 0.15);
  border-color: #c084fc;
  color: #fff;
  transform: translateY(-2px);
  box-shadow: 0 0 20px rgba(168, 85, 247, 0.3) inset, 0 8px 25px rgba(168, 85, 247, 0.25);
}

.visualize-btn-large:active:not(:disabled) {
  transform: translateY(1px);
}

.visualize-btn-large:disabled {
  opacity: 0.5;
  cursor: wait;
}

`;

if (oldSection && oldSection.length > 50) {
  css = css.replace(oldSection, newSection);
  fs.writeFileSync('client/src/index.css', css);
  console.log('CSS updated successfully.');
} else {
  // Try with \n instead of \r\n
  const oldSectionLF = css.substring(
    css.indexOf('.result-area {\n'), 
    css.indexOf('.generated-image-container {\n')
  );
  if (oldSectionLF && oldSectionLF.length > 50) {
    css = css.replace(oldSectionLF, newSection);
    fs.writeFileSync('client/src/index.css', css);
    console.log('CSS updated successfully (LF).');
  } else {
    console.log('Could not find section to replace.');
  }
}
