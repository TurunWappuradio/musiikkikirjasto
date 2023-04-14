import { Accordion } from '@mantine/core';

const Submission = ({ submission }) => {
  const { id, ripper_name, files } = submission;

  return (
    <Accordion.Item value={id.toString()}>
      <Accordion.Control>
        {files.length} tiedostoa, {ripper_name}
      </Accordion.Control>
      <Accordion.Panel>Sisältö</Accordion.Panel>
    </Accordion.Item>
  );
};

export default Submission;
