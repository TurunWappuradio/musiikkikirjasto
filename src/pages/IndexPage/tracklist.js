import tracklist from './tracklist.json'

const getRows = (rowNum, searchTerm) => {
  if (searchTerm === "") return tracklist.slice(rowNum, rowNum + 100);

  const s = searchTerm.toLowerCase();

  return tracklist.filter(t => 
      t?.album.toLowerCase().includes(s)
      || t?.artist.toLowerCase().includes(s)
      || t?.title.toLowerCase().includes(s)
    )
    .slice(rowNum, rowNum + 100);
}

export { getRows };