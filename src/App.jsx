import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Design1 from './designs/Design1';
import Design3 from './designs/Design3';
import Design4 from './designs/Design4';
import Design5 from './designs/Design5';
import Design6 from './designs/Design6';
import Design7 from './designs/Design7';
import Design8 from './designs/Design8';
import Design9 from './designs/Design9';
import Design10 from './designs/Design10';
import Design11 from './designs/Design11';
import Design12 from './designs/Design12';
import Design13 from './designs/Design13';
import Design14 from './designs/Design14';
import Design15 from './designs/Design15';
import Design16 from './designs/Design16';
import Design17 from './designs/Design17';
import DesignNav from './components/DesignNav';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Design1 sidebarVariant="stadiumChalk" />} />
        <Route path="/1" element={<Design1 showLiveTicker={false} sidebarVariant="stadiumCancha" cardGreen="cancha" />} />
        <Route path="/2" element={<Design1 tickerPosition="bottom" sidebarVariant="stadiumChalk" cardGreen="cancha" />} />
        <Route path="/3" element={<Design3 />} />
        <Route path="/4" element={<Design4 />} />
        <Route path="/5" element={<Design5 />} />
        <Route path="/6" element={<Design6 />} />
        <Route path="/7" element={<Design7 />} />
        <Route path="/8" element={<Design8 />} />
        <Route path="/9" element={<Design9 />} />
        <Route path="/10" element={<Design10 />} />
        <Route path="/11" element={<Design11 />} />
        <Route path="/12" element={<Design12 />} />
        <Route path="/13" element={<Design13 />} />
        <Route path="/14" element={<Design14 />} />
        <Route path="/15" element={<Design15 />} />
        <Route path="/16" element={<Design16 />} />
        <Route path="/17" element={<Design17 />} />
      </Routes>
      <DesignNav />
    </BrowserRouter>
  );
}

export default App;
