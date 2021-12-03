const getPairsFromFiles = async () => {
  let fileUrl;
  let arrayOfArrays = [];

  for (let i = 0; i < 20; i++){
    fileUrl = `./2kk_words_400x400/out${i}.txt`

    await fetch(fileUrl)
      .then(response => response.text())
      .then(text => arrayOfArrays.push(text.split('\n')))
  }
  
  return arrayOfArrays;
}

const oneArrayFromAllFiles = async () => {
  const arrayOfArrays = await getPairsFromFiles();

  let oneBigArray = [];
  for (let el of arrayOfArrays){
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
  const arrayOfArrays = await getPairsFromFiles();

  let arr1;
  let arr2 = arrayOfArrays[0];

  for (let i = 1; i < 20; i++){
    arr1 = arrayOfArrays[i];
    arr2 = arr1.filter(value => arr2.includes(value));
  }

  console.log('Exists in all files: ' + arr2.length);
}

const existInAtLeastTen = async () => {
  const arrayOfArrays = await getPairsFromFiles();
  const oneBigArray = new Set([...await oneArrayFromAllFiles()]);

  let values = {};

  oneBigArray.forEach(el => values[el] = 0);
  arrayOfArrays.forEach(el => (new Set([...el])).forEach(it => values[it] = values[it] + 1));

  let counter = 0;
  for (let key in values){
    if (values[key] > 9) {
      counter += 1;
    }
  }

  console.log('Exists in at least ten: ' + counter);
}

uniqueValues();
existInAllFiles();
existInAtLeastTen();