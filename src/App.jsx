import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Design1 from './designs/Design1';
import Design1V1 from './designs/Design1V1';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Design1 />} />
        <Route path="/1" element={<Design1V1 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
