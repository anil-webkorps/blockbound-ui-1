import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import "./App.css";
import Step1 from "./pages/Step1";
import Step1FileUpload from "./pages/Step1FileUpload";
import Step2 from "./pages/Step2";
import Step3 from "./pages/Step3";
import Step4 from "./pages/Step4";
import Testbed from "./pages/Testbed";
import Success from "./pages/Success";
import Certificate from "./pages/Certificate";
import Header from "./components/Header";
import React, { useContext, useEffect } from "react";
import { FileContext } from "./context/FileContext";
import { useHistory, useLocation } from 'react-router-dom';

function App() {
  const history = useHistory();
  
  const fileContext = useContext(FileContext);
  
  return (
    <div className="App bg-gray-900">
      <Header />
      <Router>
        <Switch>
          <Route exact path="/" component={Step1} />
            <Route exact path="/step1" component={Step1} />
            <Route exact path="/step1fu" component={Step1FileUpload} />
            <Route exact path="/step2" component={Step2} />
            <Route exact path="/step3" component={Step3} />
            <Route exact path="/step4" component={Step4} />
            {/* <Route exact path="/Testbed" component={Testbed} /> */}
            <Route exact path="/success" component={Success} />
            <Route exact path="/certificate/:hash" component={Certificate} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
