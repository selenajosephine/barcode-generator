import { useState } from 'react';
import './App.css';
import { Header, Footer, LoginComponent, Configs } from './components';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { checkEligibility } from './utils/UserUtils';

export const App = () => {

  const [user, setUser] = useState();

  if (!user) {
    return (
      <div className="d-flex flex-column min-vh-100">
        <Header />
        <LoginComponent setUser={setUser} />
        <Footer />
      </div>
    );
  }


  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<Configs />} key={1} id={1} allowedUsers={['admin']} isUserAllowed={checkEligibility(user, 'admin')} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
