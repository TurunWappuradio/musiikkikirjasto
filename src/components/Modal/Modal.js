import Button from '../button';
import './Modal.scss';

const Modal = ({ response, closeModal }) => {
  if (response.error) {
    return (
      <div className="Modal">
        Lähetys epäonnistui :(
        <Button onClick={closeModal}>Harmin paikka</Button>
      </div>
    );
  }

  return (
    <div className="Modal">
      <h1>Lähetys onnistui!</h1>
      <p>
        Musiikkikirjasto on vastaanottanut
        {response.album
          ? ` albumin ${response.album}`
          : ' lähettämäsi tiedostot'
        }.
      </p>
      <p>
        {response.status === 'error'
          ? "Wappuradion musiikkitiimi tarkistaa tiedostot ennenkuin ne ovat soitettavissa lähetyksessä."
          : "Kappaleet ovat nyt Musiikkikirjastossa ja valmiina soitettavaksi lähetyksessä."}
      </p>
      <p>
        Suuri kiitos musiikin lähettämisestä Wappuradiolle!
        Huolehdithan vielä, että tuottajallasi on ajantasainen lista ohjelmasi musiikista,
        ja epäselvissä tilanteissa että tuottaja saa varmasti soitettua kaikki ohjelmasi kappaleet.
      </p>
      <Button onClick={closeModal}>
        Homma OK!
      </Button>
    </div>
  );
}

export default Modal;