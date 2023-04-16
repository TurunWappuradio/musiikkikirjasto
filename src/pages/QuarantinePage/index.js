import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  Group,
  Button,
  Container,
  Accordion,
  Title,
  Text,
  Checkbox,
  Loader,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import Header from '../../components/Header';
import Submission from './Submission';
import AcceptModal from './AcceptModal';

const LAMBDA_URL = process.env.REACT_APP_MUSIC_LAMBDA_URL;

const QuarantinePage = () => {
  const { fetchSubmissions, submissions, isLoading } = useSubmissions();

  const cdSubmissions = useMemo(
    () =>
      Object.values(submissions).filter(
        ({ music_source }) => music_source === 'CD'
      ),
    [submissions]
  );

  const otherSubmissions = useMemo(
    () =>
      Object.values(submissions).filter(
        ({ music_source }) => music_source === 'Other'
      ),
    [submissions]
  );

  const [selected, setSelected] = useState(new Set());

  const [opened, { open, close }] = useDisclosure(false);

  const handleAcceptClick = open;

  const handleModalClose = () => {
    // refetch submissions
    close();
    fetchSubmissions();
  };

  const handleCheckBoxChange = useCallback(
    (id) => {
      return () =>
        setSelected((prev) => {
          const newState = new Set(prev);

          if (prev.has(id)) {
            newState.delete(id);
          } else {
            newState.add(id);
          }

          return newState;
        });
    },
    [setSelected]
  );

  return (
    <>
      <Header title="Karanteeni" />
      <Container size="80vw" px="xs" mb={100}>
        <Group>
          <Text mr="auto">Valittu: {selected.size || '0'} kpl</Text>
          <Button
            onClick={handleAcceptClick}
            disabled={selected.size === 0}
            color="green"
          >
            Hyväksy
          </Button>
        </Group>
        <Title order={2} size="h3" mb={8} mt={32}>
          CD-levyltä ripatut, {cdSubmissions.length} kpl
        </Title>
        <Text my={16}>
          Onnistuneesti Wappuradion ohjeiden mukaan ripatut CD:t menevät suoraan
          automaattisesti musiikkikirjastoon. Karanteeniin jääneissä levyissä on
          siis jotain kummallisuutta tapahtunut, joka vaatii käsin
          tarkistamisen.
        </Text>
        {isLoading ? <Loader /> : null}
        <Accordion variant="separated">
          {cdSubmissions.map(({ id, ...rest }) => (
            <SubmissionWithCheckbox
              key={id}
              submission={{ id, ...rest }}
              checked={selected.has(id)}
              onChange={handleCheckBoxChange(id)}
            />
          ))}
        </Accordion>
        <Title order={2} size="h3" mt={32} mb={8}>
          Muut lähteet, {otherSubmissions.length} kpl
        </Title>
        <Text my={16}>
          Muusta lähteestä, kuin CD:ltä hankitut biisit jäävät aina
          karanteeniin, ja vaativat musiikkitiimin hyväksynnän, jotta ne voidaan
          päästää musiikkikirjastoon.
        </Text>
        {isLoading ? <Loader /> : null}
        <Accordion variant="separated">
          {otherSubmissions.map(({ id, ...rest }) => (
            <SubmissionWithCheckbox
              key={id}
              submission={{ id, ...rest }}
              checked={selected.has(id)}
              onChange={handleCheckBoxChange(id)}
            />
          ))}
        </Accordion>
      </Container>
      <AcceptModal
        opened={opened}
        onClose={handleModalClose}
        submissions={submissions}
        selected={selected}
        clearSelected={() => setSelected(new Set())}
      />
    </>
  );
};

const SubmissionWithCheckbox = React.memo(
  ({ submission, onChange, checked }) => (
    <Group my=".5rem">
      <Checkbox onChange={onChange} checked={checked} size="lg" />
      <Submission submission={submission} />
    </Group>
  )
);

const useSubmissions = () => {
  const [submissions, setSubmissions] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const fetchSubmissions = async () => {
    setIsLoading(true);

    const password = localStorage.getItem('session');
    const res = await fetch(LAMBDA_URL, {
      method: 'POST',
      body: JSON.stringify({
        operation: 'admin/get-quarantined',
        password,
      }),
    });
    const data = await res.json();

    setSubmissions(data.submissions ?? {});
    setIsLoading(false);
  };

  useEffect(() => {
    fetchSubmissions();
  }, []);

  return { submissions, fetchSubmissions, isLoading };
};

export default QuarantinePage;
