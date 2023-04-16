import { Modal, Stack, Accordion } from '@mantine/core';
import Submission from './Submission';

const AcceptModal = ({ opened, onClose, submissions, selected }) => {
  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title="Hyväksy musiikkia kirjastoon"
      size="lg"
    >
      <Stack>
        Olet hyväksymässä {selected.size} albumia kirjastoon:
        <Accordion>
          {Array.from(selected).map((id) => (
            <Submission submission={submissions[id]} />
          ))}
        </Accordion>
      </Stack>
    </Modal>
  );
};

export default AcceptModal;
