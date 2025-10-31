import { Routes, Route } from "react-router-dom";
import User from "./components/pages/User";
import Barang from "./components/pages/Barang";



function App() {
  return (
    <div>
      <Routes>
        
        <Route path="/user" element={<User />} />
        <Route path="/barang" element={<Barang />} />
      </Routes>
      
    </div>
    
  );
}

export default App
