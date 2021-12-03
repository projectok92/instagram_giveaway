const getPairsFromFiles = async () => {
  let fileUrl;
  let arrayWithArrays = [];

  for (let i = 0; i < 20; i++){
    fileUrl = `./200k_words_100x100/out${i}.txt`;

    await fetch(fileUrl)
      .then(response => response.text())
      .then(text => arrayWithArrays.push(text.split('\n')))
  }
  
  return arrayWithArrays;
}

const oneArrayFromAllFiles = async () => {
  const arrayWithArrays = await getPairsFromFiles();

  let oneBigArray = [];
  for await (let el of arrayWithArrays){
    oneBigArray.push(...el);
  } 

  return oneBigArray;
}

const uniqueValues = async () => {
  const wordsArray = await oneArrayFromAllFiles();
  const uniqeNum = [... new Set(wordsArray)].length;

  console.log(uniqeNum);
}

uniqueValues();