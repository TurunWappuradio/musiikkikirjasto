//import tracklist from './tracklist.json';

const getSongs = async () => {
  const res = await fetch(process.env.REACT_APP_TRACKLIST_JSON_URL, {
    method: 'GET',
  });

  return (await res.json()).filter((t) => t.title);
};

// orderBy takes the fieldname as string. one of album, artist, title
const getRows = (tracklist, rowNum, searchTerm, orderBy) => {
  console.log({ orderBy });
  if (searchTerm === '') {
    if (orderBy) {
      return tracklist.sort(getOrderBy(orderBy)).slice(rowNum, rowNum + 100);
    }
    return tracklist.slice(rowNum, rowNum + 100);
  }

  const s = searchTerm.toLowerCase();

  if (orderBy) {
    return tracklist
      .sort(getOrderBy(orderBy))
      .filter(
        (t) =>
          t?.album.toLowerCase().includes(s) ||
          t?.artist.toLowerCase().includes(s) ||
          t?.title.toLowerCase().includes(s)
      )
      .slice(rowNum, rowNum + 100);
  }

  return tracklist
    .filter(
      (t) =>
        t?.album.toLowerCase().includes(s) ||
        t?.artist.toLowerCase().includes(s) ||
        t?.title.toLowerCase().includes(s)
    )
    .slice(rowNum, rowNum + 100);
};

const getOrderBy = (orderBy) => {
  return (a, b) => {
    const aLower = a[orderBy].toLowerCase();
    const bLower = b[orderBy].toLowerCase();

    if (aLower === bLower) {
      return 0;
    }
    return aLower < bLower ? -1 : 1;
  };
};

export { getSongs, getRows };
