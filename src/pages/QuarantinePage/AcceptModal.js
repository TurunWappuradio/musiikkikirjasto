import { useState } from 'react';

import { Modal, Stack, Accordion, Group, Button, Text } from '@mantine/core';
import Submission from './Submission';

const LAMBDA_URL = process.env.REACT_APP_MUSIC_LAMBDA_URL;

const AcceptModal = ({
  opened,
  onClose,
  submissions,
  selected,
  clearSelected,
}) => {
  const [loading, setLoading] = useState(false);
  const [current, setCurrent] = useState(0);
  const [error, setError] = useState(null);
  const success = current === selected.size;

  const disableSubmit = error !== null || success;

  const handleAccept = async () => {
    setLoading(true);

    for (const id of Array.from(selected)) {
      try {
        const res = await acceptSubmission(id);

        if (res.status !== 200) {
          setError(
            `Accepting submission ${id} failed with statuscode ${res.status}`
          );
          setLoading(false);
          break;
        }

        setCurrent((prev) => prev + 1);
      } catch (err) {
        setError(`Fetch failed for submission ${id}: ${err.message}`);
        setLoading(false);
        break;
      }
    }
    setLoading(false);
  };

  const handleClose = () => {
    if (success) {
      clearSelected();
    }

    setLoading(false);
    setCurrent(0);
    setError(null);
    onClose();
  };

  return (
    <Modal
      opened={opened}
      onClose={handleClose}
      title="Hyväksy musiikkia kirjastoon"
      size="70vw"
    >
      <Stack>
        Olet hyväksymässä {selected.size} albumia kirjastoon:
        <Accordion>
          {Array.from(selected).map((id) => (
            <Submission key={id} submission={submissions[id]} />
          ))}
        </Accordion>
        <Group>
          <Button color="red" onClick={handleClose} disabled={success}>
            Ei!
          </Button>
          <Button
            color="green"
            onClick={handleAccept}
            loading={loading}
            disabled={disableSubmit}
          >
            Kyllä, hyväksyn
          </Button>
          {loading ? (
            <Text>
              Hyväksytty {current}/{selected.size}
            </Text>
          ) : null}
          {success ? <Text color="green">Valmista tuli!</Text> : null}
        </Group>
        {error ? (
          <Text color="red" size="xl">
            Hyväksyminen epäonnistui, kerro tekniikkatiimille: {error}
          </Text>
        ) : null}
      </Stack>
    </Modal>
  );
};

const acceptSubmission = (submission_id) => {
  const password = localStorage.getItem('session');
  return fetch(LAMBDA_URL, {
    method: 'POST',
    body: JSON.stringify({
      operation: 'admin/accept-submission',
      password,
      submission_id,
    }),
  });
};

export default AcceptModal;
