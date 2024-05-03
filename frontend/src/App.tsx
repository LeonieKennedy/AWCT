import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/home';
import TranscribeAudio from './pages/transcribe_audio';
import TranslateText from './pages/translate_text';
import Signup from './pages/auth/signup';
import Login from './pages/auth/login';
import Cookies from 'js-cookie';

const App: React.FC = () => {
  const isAuthenticated = Cookies.get('user') ? true : false;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={isAuthenticated ? <Navigate to="/login" /> : <Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/transcribe_audio"
          element={isAuthenticated ? <TranscribeAudio /> : <Navigate to="/login" />}
        />
        <Route
          path="/translate_text"
          element={isAuthenticated ? <TranslateText /> : <Navigate to="/login" />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
