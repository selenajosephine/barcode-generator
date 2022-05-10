import { useState } from 'react';
import './App.css';
import { Header, Footer, LoginComponent, Configs, GenerateBarcode } from './components';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { checkEligibility, getUserInSession } from './utils/UserUtils';
import { LandingPage } from './components';

export const App = () => {

  const sessionUser = getUserInSession();
  const [user, setUser] = useState(sessionUser || false);

  if (!user) {
    return (
      <div className="d-flex flex-column min-vh-100">
        <Header />
        <LoginComponent setUser={setUser} />
        <Footer />
      </div>
    );
  }
  console.log(user);
  return (
    <div className="d-flex flex-column min-vh-100">
      <span className="no-print">
        <Header />
      </span>
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<LandingPage user={user} />} key={1} id={1} />
          <Route exact path='/configs' element={<Configs isUserAllowed={checkEligibility(user.roles, 'admin')} />} key={2} id={2} />
          <Route exact path='/generate' element={<GenerateBarcode isUserAllowed={checkEligibility(user.roles, 'admin')} />} key={2} id={2} />
          <Route exact path='/moderate/generate' element={<GenerateBarcode isUserAllowed={checkEligibility(user.roles, 'moderator')} />} key={2} id={2} />
        </Routes>
      </BrowserRouter>
      <span className="no-print">
        <Footer />
      </span>
    </div>
  );
}

export default App;
