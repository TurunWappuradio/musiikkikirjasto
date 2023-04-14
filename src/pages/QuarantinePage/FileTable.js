import { Title, Table } from '@mantine/core';

const FileTable = ({ files }) => {
  const rows = files.map((file) => (
    <tr key={file.id}>
      <td>{file.filename}</td>
      <td>{file.filetype}</td>
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
            <th>Tyyppi</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </>
  );
};

export default FileTable;
