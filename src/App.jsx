import { Routes, Route } from "react-router-dom";

import Navigation from "./components/routes/navigation/navigation.component";
import Home from "./components/routes/home/home.component";
import Authentication from "./components/routes/authentication/authentication.component";
import ReadRecords from "./components/routes/read-records/read-records.component";
import AddRecords from "./components/routes/add-records/add-records.component";
import PrivateRoutes from "./components/helper-components/private-routes/private-routes";

import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="/authentication" element={<Authentication />} />
        <Route element={<PrivateRoutes />}>
          <Route path="/read-records" element={<ReadRecords />} />
          <Route path="/add-records" element={<AddRecords />} />
        </Route>
      </Route>
    </Routes>
  );
}
export default App;
