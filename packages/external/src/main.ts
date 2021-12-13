import $ from 'cash';

const main = async () => {
  const files = await $.ls('.');
  console.log(files);
};

main();