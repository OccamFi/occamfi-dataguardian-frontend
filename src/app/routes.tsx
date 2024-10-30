import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Binance } from "pages/binance";
import { DevPage } from "pages/dev";
import { HomePage } from "pages/home";
import { Twitter } from "pages/twitter";
import { Uniswap } from "pages/uniswap";
import { HolderCommitmentGuard } from "shared/providers/holder-commitment-guard";

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<HolderCommitmentGuard />} path="/">
          <Route element={<HomePage />} index />
          <Route element={<Twitter />} path="/provider/x" />
          <Route element={<Uniswap />} path="/provider/uniswap" />
          <Route element={<Binance />} path="/provider/binance" />
        </Route>
        <Route element={<DevPage />} path="/dev" />
      </Routes>
    </BrowserRouter>
  );
};
