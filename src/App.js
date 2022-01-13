import './App.css';
import { Header, Footer, GenerateBarcode, Configs } from './components';
import { useState } from 'react';

export const App = () => {

  const [isConfigs, setConfigs] = useState(false)

  const handleClick = () => setConfigs(true)

  return (
    <div className="d-flex flex-column min-vh-100">
      <Header />

      <div>
        {isConfigs ? <Configs setConfigs={setConfigs} /> : (
          <>
            <div className="p-3 blue-font" onClick={handleClick}>
              {localStorage.getItem('sels-barcode-sequence') ? 'Update Defaults' : 'Set Defaults'}
            </div>
            <GenerateBarcode />
          </>
        )
        }
      </div>
      <footer className="mt-auto">
        <Footer />
      </footer>
    </div>
  );
}

export default App;
