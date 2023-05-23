import { Route, Routes} from 'react-router-dom';
import Header from './components/Header';
import Main from './components/Main';
import Footer from './components/Footer';
import MySongs from './components/MySongs';
import Info from './components/Info';
import LoginForm from './components/LoginForm';
import ErrorPage from './components/ErrorPage';

import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
          <Route path="/" element={ <Main />} />
          <Route path="/mysongs" element={ <MySongs /> } />
          <Route path="/info" element={ <Info /> } />
          <Route path="/login" element={ <LoginForm /> } />
          <Route path="*" element={ <ErrorPage /> } />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
