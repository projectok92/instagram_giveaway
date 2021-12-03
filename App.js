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
  for (let el of arrayWithArrays){
    oneBigArray.push(...el);
  } 

  return oneBigArray;
}

const uniqueValues = async () => {
  const oneBigArray = await oneArrayFromAllFiles();
  const uniqeNum = [... new Set(oneBigArray)].length;

  console.log('Unique: '+ uniqeNum);
}

const existInAllFiles = async () => {
  const arrayWithArrays = await getPairsFromFiles();

  let arr1;
  let arr2;
  let currentResult = arrayWithArrays[0];

  for (let i = 1; i < 20; i++) {
    arr1 = arrayWithArrays[i];
    arr2 =  currentResult;

    currentResult = arr1.filter(value => arr2.includes(value));
    console.log(currentResult);
  }

  console.log('Exist in all files: ' + currentResult.length);
}

uniqueValues();
existInAllFiles();
