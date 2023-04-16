import { Title, Table } from '@mantine/core';

const FileTable = ({ files }) => {
  const rows = files.sort(compareFile).map((file) => (
    <tr key={file.id}>
      <td>{file.filename}</td>
      <td>{file?.metadata?.title ?? '–'}</td>
      <td>{file?.metadata?.artist ?? '–'}</td>
      <td>{file?.metadata?.album ?? '–'}</td>
      <td>{file?.metadata?.year ?? '–'}</td>
      <td>{formatLength(file?.metadata?.length)}</td>
    </tr>
  ));

  return (
    <>
      <Title order={4} my={8} size="h4">
        Tiedostot
      </Title>
      <Table>
        <thead>
          <tr>
            <th>Tiedosto</th>
            <th>Kappale</th>
            <th>Artisti</th>
            <th>Albumi</th>
            <th>Vuosi</th>
            <th>Kesto</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </>
  );
};

const compareFile = (a, b) => {
  // sort non audiofiles to the top.
  if (!b?.metadata?.tracknumber) {
    return 100;
  }

  const aDisc = parseInt(a?.metadata?.discnumber);
  const bDisc = parseInt(b?.metadata?.discnumber);

  // sort by discnubmer
  if (aDisc < bDisc) {
    return -1;
  }
  if (aDisc > bDisc) {
    return 1;
  }

  const aTrack = parseInt(a?.metadata?.tracknumber);
  const bTrack = parseInt(b?.metadata?.tracknumber);

  // sort by tracknubmer
  if (aTrack < bTrack) {
    return -1;
  }
  if (aTrack > bTrack) {
    return 1;
  }

  return 0;
};

const formatLength = (length) => {
  if (!length) return '–';

  const sec_num = parseInt(length);
  const minutes = Math.floor(sec_num / 60);
  const seconds = Math.floor(sec_num % 60);

  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

export default FileTable;
