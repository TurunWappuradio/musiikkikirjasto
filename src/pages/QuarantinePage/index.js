import { useEffect, useState } from 'react';
import {
  Group,
  Button,
  Container,
  Accordion,
  Title,
  Text,
} from '@mantine/core';

import Header from '../../components/Header';
import Submission from './Submission';

const LAMBDA_URL = process.env.REACT_APP_MUSIC_LAMBDA_URL;

const QuarantinePage = () => {
  const { cdSubmissions, otherSubmissions } = useSubmissions();

  const [selected, setSelected] = useState(new Set());

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
          <Button color="green">Hyväksy</Button>
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
            <Submission
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
            <Submission
              key={id}
              submission={{ id, ...rest }}
              chcked={selected.has(id)}
              onChange={() => handleCheckBoxChange(id)}
            />
          ))}
        </Accordion>
      </Container>
    </>
  );
};

const useSubmissions = () => {
  const [cdSubmissions, setCdSubmissions] = useState([]);
  const [otherSubmissions, setOtherSubmissions] = useState([]);

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

      const values = data.submissions ? Object.values(data.submissions) : [];
      const cds = values.filter(({ music_source }) => music_source === 'CD');
      const others = values.filter(
        ({ music_source }) => music_source === 'Other'
      );

      setCdSubmissions(cds);
      setOtherSubmissions(others);
    };

    fn();
  }, []);

  return { cdSubmissions, otherSubmissions };
};

export default QuarantinePage;
