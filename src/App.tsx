import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Resources from './pages/Resources';
import About from './pages/About';
import Citation from './pages/Citation';
import Feedback from './pages/Feedback';
import Diagram from './pages/Diagram';
import FullChecklist from './pages/FullChecklist';
import FullChecklistInformation from './pages/FullChecklistInformation';
import AbstractChecklist from './pages/AbstractChecklist';
import AbstractChecklistInformation from './pages/AbstractChecklistInformation';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
          <Header />
          <main style={{ flex: 1 }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/resources" element={<Resources />} />
              <Route path="/about" element={<About />} />
              <Route path="/citation" element={<Citation />} />
              <Route path="/feedback" element={<Feedback />} />
              <Route path="/diagram" element={<Diagram />} />
              <Route path="/fullchecklist" element={<FullChecklist />} />
              <Route path="/fullchecklist-information" element={<FullChecklistInformation />} />
              <Route path="/abstractchecklist" element={<AbstractChecklist />} />
              <Route path="/abstractchecklist-information" element={<AbstractChecklistInformation />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
