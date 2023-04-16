import Button from '../button';
import './Modal.scss';

const Modal = ({ response, closeModal }) => {
  if (response.error) {
    return (
      <div className="Modal">
        <h1>Lähetys epäonnistui :(</h1>
        Tämä on odottamaton virhe, jota ei pitäisi tapahtua. Syy virheelle voi
        olla:
        <ul>
          <li>
            Syötit paljon tiedostoja ja muisti loppui kesken. Palvelulla on 1GB
            muistia käytössä, tätä suurempi määrä tiedostoja ei toimi samassa
            suorituksessa.
          </li>
          <li>
            Suoritus aikakatkaistiin. Suuri määrä tiedostoja voi aiheuttaa
            aikakatkaisun, sillä palvelulla on 30 sekuntia suoritusaikaa.
            Tiedostojen lähettämiseen kulunut aika ei vaikuta tähän, ja siten
            vika ei ole verkkonopeudessasi.
          </li>
        </ul>
        <Button onClick={closeModal}>Harmin paikka</Button>
      </div>
    );
  }

  const validationError = response.status === 'error';

  return (
    <div className="Modal">
      <h1>
        {validationError
          ? 'Musiikki on lähetetty tarkistettavaksi!'
          : 'Lähetys onnistui!'}
      </h1>
      <p>
        Musiikkikirjasto on vastaanottanut
        {response.album
          ? ` albumin ${response.album}`
          : ' lähettämäsi tiedostot'}
        .
      </p>
      <p>
        {validationError
          ? 'Wappuradion musiikkitiimi tarkistaa tiedostot ennenkuin ne ovat soitettavissa lähetyksessä.'
          : 'Kappaleet ovat nyt Musiikkikirjastossa ja valmiina soitettavaksi lähetyksessä.'}
      </p>
      <p>
        Suuri kiitos musiikin lähettämisestä Wappuradiolle! Huolehdithan vielä,
        että tuottajallasi on ajantasainen lista ohjelmasi musiikista, ja
        epäselvissä tilanteissa että tuottaja saa varmasti soitettua kaikki
        ohjelmasi kappaleet.
      </p>
      <Button onClick={closeModal}>Homma OK!</Button>
    </div>
  );
};

export default Modal;
