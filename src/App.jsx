import { Route, Routes } from "react-router-dom";

import PrivateRoutes from "./components/helper-components/private-routes/private-routes";
import AllRecords from "./components/routes/all-records/all-records.component";
import Authentication from "./components/routes/authentication/authentication.component";
import Home from "./components/routes/home/home.component";
import Navigation from "./components/routes/navigation/navigation.component";
import Spaces from "./components/routes/spaces/spaces.component";
import SpacesRecords from "./components/routes/spaces-records/spaces-records.component";
import SummaryComponent from "./components/routes/summary/summary.component";

import "./App.css";

function App() {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="/" element={<Navigation />}>
        <Route path="/authentication" element={<Authentication />} />
        {/* consider private routes  */}
        <Route element={<PrivateRoutes />}>
          <Route path="/spaces" element={<Spaces />} />
          <Route path="/spaces-records" element={<SpacesRecords />} />
          <Route path="/all-records" element={<AllRecords />} />
          <Route path="/summary" element={<SummaryComponent />} />
        </Route>
      </Route>
    </Routes>
  );
}
export default App;
