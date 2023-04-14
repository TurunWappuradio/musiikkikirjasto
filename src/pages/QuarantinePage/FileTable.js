import { Title, Table } from '@mantine/core';

const FileTable = ({ files }) => {
  const rows = files.sort(compareFile).map((file) => (
    <tr key={file.id}>
      <td>{file.filename}</td>
      <td>{file.filetype}</td>
    </tr>
  ));

  console.log(files)

  return (
    <>
      <Title order={4} my={8} size="h4">
        Tiedostot
      </Title>
      <Table>
        <thead>
          <tr>
            <th>Tiedosto</th>
            <th>Tyyppi</th>
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

export default FileTable;
