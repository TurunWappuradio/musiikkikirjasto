import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import IndexPage from './pages/IndexPage';
import UploadPage from './pages/UploadPage';
import ControlPage from './pages/ControlPage';
import ProfessionalPage from './pages/UploadPage/ProfessionalPage';
import QuarantinePage from './pages/QuarantinePage';
import './styles/main.scss';

const App = () => {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact={true}>
            <IndexPage />
          </Route>
          <Route path="/lisaa">
            <UploadPage />
          </Route>
          <Route path="/ammattilainen">
            <ProfessionalPage />
          </Route>
          <Route path="/hallinta">
            <ControlPage />
          </Route>
          <Route path="/karanteeni">
            <QuarantinePage />
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
