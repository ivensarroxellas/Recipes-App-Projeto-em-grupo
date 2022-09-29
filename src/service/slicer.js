const slicer = (arr) => {
  const NUMBER_TO_SLICE = 12;
  if (arr < NUMBER_TO_SLICE && arr === null) {
    return arr;
  } return arr.slice(0, NUMBER_TO_SLICE);
};

export default slicer;
