import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Design1 from './designs/Design1';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Design1 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
