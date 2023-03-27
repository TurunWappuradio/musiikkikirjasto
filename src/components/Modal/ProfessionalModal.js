import Button from '../button';
import './Modal.scss';

const ProfessionalModal = ({ responses, closeModal }) => (
  <div className="Modal">
    <h1>Lähetys onnistui!</h1>
    {responses.map((response, idx) => (
      <div key={idx}>
        <h2>{response.album}</h2>
        {response.errors.length === 0
          ? 'Meni sukkana sisään'
          : 'Sattuipa validointivirheitä :('}
        <ul>
          {response.errors.map((err) => (
            <li key={err}>{err}</li>
          ))}
        </ul>
      </div>
    ))}
    <Button onClick={closeModal}>Homma OK!</Button>
  </div>
);

export default ProfessionalModal;
