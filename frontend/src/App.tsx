import React from 'react';
import { BrowserRouter, Routes, Route  } from 'react-router-dom';
import Home from './pages/home';
import TranscribeAudio from './pages/transcribe_audio';
import TranslateText from './pages/translate_text';
import Profile from './pages/profile'; 

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="transcribe_audio" element={<TranscribeAudio />} />
        <Route path="translate_text" element={<TranslateText />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;