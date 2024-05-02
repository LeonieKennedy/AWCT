<<<<<<< HEAD
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
=======
import { BrowserRouter, Routes, Route  } from 'react-router-dom'
import Home from './pages/home';
import TranscribeAudio from './pages/transcribe_audio';
import TranslateText from './pages/translate_text';

 const App: React.FC = () => {


  return (
  <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="transcribe_audio" element={<TranscribeAudio />} />
        <Route path="translate_text" element={<TranslateText />} />
      </Routes>
  </BrowserRouter>
  )
 }
>>>>>>> c787479d6ba7f7fe594bdbde30b87c85e2048cce

export default App;