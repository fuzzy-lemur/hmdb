import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Navbar from './components/Navbar';
import SearchPage from './components/SearchPage';
import DetailsPage from './components/DetailsPage';
import Footer from './components/Footer';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<SearchPage />} />
          <Route path='/search' element={<SearchPage />} />
          <Route path='/details/:id' element={<DetailsPage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
