const sampleText = `he  llo, world. he said:- name is "boldman". I'm yomi world`;

const extractWords = (content) => {
  const bareContent = content.replace('\n', '');
  // replace some specified tokens 
  const replacedContent = replaceTokens(bareContent);
  // split content into words
  const splittedContent = replacedContent.split(' ').filter(e => e !== '');
  // capitalize the content
  const capitalizedContent = mapCapitalize(splittedContent);
  // remove duplicates 
  const uniqueContent = removeDuplicates(capitalizedContent);
  // sort array alphabetically
  uniqueContent.sort(); 
  console.log('Result:', uniqueContent);
  // return result as array .. maintain annotation even though js has no annotations 
  return uniqueContent;
}

const replaceTokens = (content) => {
  // this tokens is surely going to be more work than this 
  let rContent = content.replaceAll('?', ' ')
  const replacementPattern = /[\(\)\[\]""''\.,:-;\/=!]/ig
  rContent = rContent.replace(/\r\n|\r|\n/g, ' ');
  console.log('AFter first replacement : ', rContent)
  rContent = rContent.replace(replacementPattern, ' ');
  console.log('AFter second replacement : ', rContent)
  rContent = rContent.replaceAll('¿', ' ');
  const delims = document.querySelector('.extra-chars-input').value
  if(delims.length > 0)
    rContent = delims.split(',').reduce((acc, curr) => acc.replaceAll(curr, ' '), rContent)
  return rContent;
}

const removeDuplicates = (words) => {
  return [...new Set(words)]
}

const mapCapitalize = (words) => {
  return words.map(word => word[0].toUpperCase() + word.substring(1).toLowerCase())
}

const showOutput = (value) => {
  document.querySelector('.output').value = value.join('\r');
}

const readInput = () => {
  return document.querySelector('.input').value;
}

const process = () => {
  const input = readInput();
  console.log('input: ', input)
  const output = extractWords(input);
  showOutput(output);
}

document.querySelector('.extract').addEventListener('click', () => {
  console.log('Processing ... ');
  process();
});

document.querySelector('.btn.copy').addEventListener('click', async () => {
  const value = document.querySelector('.output').value;
  await navigator.clipboard.writeText(value);
  Toastify({
    text: "Wordlist has been copied to clipboard",
    duration: 3000,
    close: true,
    gravity: "top",
    position: "right", 
    stopOnFocus: true,
    style: {
      background: "linear-gradient(to right, #FFC090, #FFC090)",
      fontsize: "20px;"
    },
  }).showToast();
});