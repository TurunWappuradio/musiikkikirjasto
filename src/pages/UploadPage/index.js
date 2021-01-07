import Dropzone from './DropZone';
import Button from '../../components/button';
import './UploadPage.scss';

const UploadPage = () => {
  return (
    <div>
      <h1>Lähetä musiikkia</h1>
      <Dropzone />
      <div className="Box">
        <Button>Lähetä</Button>
      </div>
    </div>
  );
}

export default UploadPage;