import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Landing } from "../Pages/landing";

export const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="" element={<Landing />} />
        {/* <Route path="*" element={<Error />} /> */}
      </Routes>
    </BrowserRouter>
  );
};
