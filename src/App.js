import { Route, Routes} from 'react-router-dom';
import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';
import ComingSoon from './components/ComingSoon';
import Info from './components/Info';

import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
          <Route path="/" element={ <Main />} />
          <Route path="/mysongs" element={ <ComingSoon /> } />
          <Route path="/info" element={ <Info /> } />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
