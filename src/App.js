import { Routes, Route, BrowserRouter } from "react-router-dom";
import './App.css';
import TrendingChart from './Templates/Poocointrade';
import Check from "./Templates/Check";
import Pools from "./Templates/Pools";

function App() {
    
  return (
    <>
      
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<TrendingChart />} />
          <Route path="/token/:address" element={<TrendingChart />} />
          <Route path="/check" element={<Check />}></Route>
          <Route path="/pool" element={<Pools />}></Route>
        </Routes>
      </BrowserRouter>
    </>


  );
}
export default App;
