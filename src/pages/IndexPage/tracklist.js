import tracklist from './tracklist.json'

const getRows = ( rowNum ) => {
  return tracklist.slice(rowNum, rowNum + 100);
}

export { getRows };