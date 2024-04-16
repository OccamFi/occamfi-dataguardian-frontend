import { BrowserRouter, Route, Routes } from "react-router-dom";

import { DevPage } from "pages/dev";
import { HomePage } from "pages/home";
import { Twitter } from "pages/twitter";
import { HolderCommitmentGuard } from "shared/providers/holder-commitment-guard";

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<HolderCommitmentGuard />} path="/">
          <Route element={<HomePage />} index />
          <Route element={<Twitter />} path="/provider/x" />
        </Route>
        <Route element={<DevPage />} path="/dev" />
      </Routes>
    </BrowserRouter>
  );
};
