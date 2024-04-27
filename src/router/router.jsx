import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Landing } from "../Pages/landing";
import { Edit } from "../Pages/edit";

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<Landing />} />
        <Route path="/edit" element={<Edit />} />
        {/* <Route path="*" element={<Error />} /> */}
      </Routes>
    </BrowserRouter>
  );
};
