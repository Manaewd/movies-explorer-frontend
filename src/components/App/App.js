import './App.css';
import Header from "../Header/Header";
import Footer from '../Footer/Footer';
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function App() {
  
  return (
    <CurrentUserContext.Provider>
    <div className="page">
      <Header />
      <Footer />
    </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
