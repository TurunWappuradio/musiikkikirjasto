import { TiNotesOutline as Note, TiDocument as Document } from 'react-icons/ti';
import { AiOutlineLoading as Loading, AiOutlineCheck as Check, AiOutlineClose as Cross } from 'react-icons/ai';

const File = ({ isAudioFile, metadata, isLoading, isValidFile }) => {
  return (
    <div className="Dropzone-file">
      {isAudioFile
        ? <Note />
        : <Document />}
      <Meta metadata={metadata} />
      {isLoading && <Loading className="Dropzone-loading" />}
      {!isLoading && isValidFile && <Check className="Dropzone-check" />}
      {!isLoading && !isValidFile && <Cross className="Dropzone-cross" />}
    </div>
  );
}

const Meta = ({ metadata }) => (
  <div className="File-metadata">
    <h1>{metadata.title}</h1>
    <p>{metadata.artist}</p>
    <p>{metadata.album}</p>
    <p>{metadata.year}</p>
  </div>
);

export default File;