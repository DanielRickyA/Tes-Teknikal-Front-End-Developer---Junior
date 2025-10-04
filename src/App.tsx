import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import LandingPage from "./app/LandingPage";
import AddUpdateProduk from "./app/AddUpdateProduk";
import { Toaster } from "sonner";
import AbilityPokemon from "./app/AbilityPokemon";
import BattleArmorPokemon from "./app/BattleArmorPokemon";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route index element={<LandingPage />} />
          <Route path="/produk" element={<AddUpdateProduk />} />
          <Route path="/produk/:id" element={<AddUpdateProduk />} />
          <Route path="/pokemon/ability" element={<AbilityPokemon />} />
          <Route
            path="/pokemon/battle-armor"
            element={<BattleArmorPokemon />}
          />
        </Routes>
      </Router>
      <Toaster
        toastOptions={{
          style: { fontFamily: "Poppins, sans-serif" },
        }}
        position="top-right"
        richColors
      />
    </>
  );
}

export default App;
