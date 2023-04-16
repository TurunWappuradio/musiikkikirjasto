import { useEffect, useState } from 'react';
import {
  Group,
  Button,
  Container,
  Accordion,
  Title,
  Text,
  Checkbox,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';

import Header from '../../components/Header';
import Submission from './Submission';
import AcceptModal from './AcceptModal';

const LAMBDA_URL = process.env.REACT_APP_MUSIC_LAMBDA_URL;

const QuarantinePage = () => {
  const submissions = useSubmissions();
  const cdSubmissions = Object.values(submissions).filter(
    ({ music_source }) => music_source === 'CD'
  );
  const otherSubmissions = Object.values(submissions).filter(
    ({ music_source }) => music_source === 'Other'
  );

  const [selected, setSelected] = useState(new Set());

  const [opened, { open, close }] = useDisclosure(false);

  const handleAcceptClick = open;

  const handleModalClose = close;

  const handleCheckBoxChange = (id) => {
    setSelected((prev) => {
      const newState = new Set(prev);

      if (prev.has(id)) {
        newState.delete(id);
      } else {
        newState.add(id);
      }

      return newState;
    });
  };

  return (
    <>
      <Header title="Karanteeni" />
      <Container mb={100}>
        <Group>
          <Text mr="auto">Valittu: {selected.size || '0'} kpl</Text>
          <Button onClick={handleAcceptClick} color="green">
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
        <Accordion variant="separated">
          {cdSubmissions.map(({ id, ...rest }) => (
            <SubmissionWithCheckbox
              key={id}
              submission={{ id, ...rest }}
              chcked={selected.has(id)}
              onChange={() => handleCheckBoxChange(id)}
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
        <Accordion variant="separated">
          {otherSubmissions.map(({ id, ...rest }) => (
            <SubmissionWithCheckbox
              key={id}
              submission={{ id, ...rest }}
              chcked={selected.has(id)}
              onChange={() => handleCheckBoxChange(id)}
            />
          ))}
        </Accordion>
      </Container>
      <AcceptModal
        opened={opened}
        onClose={handleModalClose}
        submissions={submissions}
        selected={selected}
      />
    </>
  );
};

const SubmissionWithCheckbox = ({ submission, checked, onChange }) => (
  <Group my=".5rem">
    <Checkbox checked={checked} onChange={onChange} size="lg" />
    <Submission submission={submission} />
  </Group>
);

const useSubmissions = () => {
  const [submissions, setSubmissions] = useState({});

  useEffect(() => {
    const fn = async () => {
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
    };

    fn();
  }, []);

  return submissions;
};

export default QuarantinePage;
