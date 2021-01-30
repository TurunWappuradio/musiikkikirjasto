import Dropzone from './DropZone';
import Button from '../../components/button';
import './UploadPage.scss';
import Header from '../../components/Header';

const UploadPage = () => (
  <>
    <Header title="Lähetä musiikkia"/>
    <div className="UploadContent">
      <Dropzone />
      <div className="Box">
        <Button>Lähetä</Button>
      </div>
    </div>
  </>
);

export default UploadPage;