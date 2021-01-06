import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import IndexPage from "./pages/IndexPage";
import UploadPage from "./pages/UploadPage";

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
        </Switch>
      </Router>
    </div>
  );
}

export default App;
