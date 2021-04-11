import tracklist from './tracklist.json';

const getSongs = async () => {
  // const res = await fetch(process.env.REACT_APP_TRACKLIST_JSON_URL, {
  //   method: 'GET',
  // })

  // return (await res.json());
  return tracklist;
}

const getRows = (tracklist, rowNum, searchTerm) => {
  if (searchTerm === "") return tracklist.slice(rowNum, rowNum + 100);

  const s = searchTerm.toLowerCase();

  return tracklist.filter(t => 
      t?.album.toLowerCase().includes(s)
      || t?.artist.toLowerCase().includes(s)
      || t?.title.toLowerCase().includes(s)
    )
    .slice(rowNum, rowNum + 100);
}

export { getSongs, getRows };