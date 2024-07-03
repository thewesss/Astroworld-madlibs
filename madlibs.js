
function parseStory(rawStory) {
  // targets specific characters on the string, (g) targets all the character occurences in pattern
  const wordTypes = {
    noun: /\[n\]/g,
    verb: /\[v\]/g,
    adjective: /\[a\]/g,
  };
//iterates through raw story string by splitting it into individual words
  return rawStory.split(' ').map(word => {
    for (const [pos, pattern] of Object.entries(wordTypes)) {
      if (pattern.test(word)) {
        return { word: word.slice(0, -3), pos };
      }
    }
    return { word };
  });
}


getRawStory()
  .then(parseStory)
  .then((processedStory) => {
    console.log(processedStory);
//creates elements
    const editVersion = document.querySelector('.madLibsEdit');
    const previewVersion = document.querySelector('.madLibsPreview');

    processedStory.forEach(word => {
      const input = document.createElement('input');
      const output = document.createElement('span');
      output.className = 'blank';
// input parameters
      if (word.pos) {
        input.type = 'text';
        input.placeholder = word.pos;
        input.maxLength = 20;
        input.addEventListener('input', () => {
          output.innerText = input.value;
        });
        editVersion.appendChild(input);
        previewVersion.appendChild(output);
      } else {
        const edit = document.createElement('span');
        edit.innerText = ` ${word.word}`;    
        editVersion.appendChild(edit);       
        const preview = document.createElement('span');
        preview.innerText = ` ${word.word}`;
        previewVersion.appendChild(preview);
      }
    });
//event listener for pressing "enter"
    const blanks = document.querySelectorAll('.madLibsEdit input');
    blanks.forEach((blank, index) => {
      blank.addEventListener('keypress', e => {
        if (e.key === 'Enter') {
          blanks[(index + 1) % blanks.length].focus();
        }
      });
    });
});
//music for the game  
const sound = document.querySelector("#music");
const startSound = document.querySelector(".play");
startSound.addEventListener("click", () => sound.play());

const stopSound = document.querySelector(".stop");
stopSound.addEventListener("click", () => sound.pause());