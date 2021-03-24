export default function PaletteMaker(noOfColours) {
  let palette = [];

  for (let i = 0; i < noOfColours; i++) {
    palette.push("#".concat(Math.floor(Math.random() * 16777215).toString(16)));
  }
  return palette;
}
