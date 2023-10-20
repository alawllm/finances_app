import { Route, Routes } from "react-router-dom";

import PrivateRoutes from "./components/helper-components/private-routes/private-routes";
import Authentication from "./components/routes/authentication/authentication.component";
import Collections from "./components/routes/collections/collections.component";
import Home from "./components/routes/home/home.component";
import Navigation from "./components/routes/navigation/navigation.component";
import Records from "./components/routes/records/records.component";

import "./App.css";

function App() {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="/" element={<Navigation />}>
        <Route path="/authentication" element={<Authentication />} />
        {/* consider private routes  */}
        <Route element={<PrivateRoutes />}>
          <Route path="/collections" element={<Collections />} />
          <Route path="/records" element={<Records />} />
        </Route>
      </Route>
    </Routes>
  );
}
export default App;
