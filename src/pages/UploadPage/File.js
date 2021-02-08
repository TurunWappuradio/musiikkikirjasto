import { TiNotesOutline as Note, TiDocument as Document } from 'react-icons/ti';
import { AiOutlineLoading as Loading, AiOutlineCheck as Check } from 'react-icons/ai';

const File = ({ isAudioFile, metadata, isLoading }) => {
  return (
    <div className="Dropzone-file">
      {isAudioFile
        ? <Note />
        : <Document />}
      <Meta metadata={metadata} />
      {isLoading
        ? <Loading className="Dropzone-loading" />
        : <Check className="Dropzone-check" />}
    </div>
  );
}

const Meta = ({ metadata }) => (
  <div className="File-metadata">
    <h1>{metadata.title}</h1>
    <p>{metadata.artist}</p>
    <p>{metadata.album}</p>
  </div>
);

export default File;