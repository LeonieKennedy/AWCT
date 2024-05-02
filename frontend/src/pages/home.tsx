<<<<<<< HEAD
import React, { ChangeEvent, useState } from 'react';
import styled from 'styled-components';
import ButtonComponent from '../components/button';
import { NavLink } from 'react-router-dom';
import logo from '../assets/logo.jpg';
import rightLogo from '../assets/right_logo.png';
=======
import React, { ChangeEvent, ChangeEventHandler, useState } from 'react'
import styled from 'styled-components';
import ButtonComponent from '../components/button';
import { SelectorComponent } from '../components/selector';
import { translateOptions } from '../data';
import { InputComponent } from '../components/input';
import logo from '../assets/logo.jpg';
import rightLogo from '../assets/right_logo.png';
import { NavLink } from 'react-router-dom';
>>>>>>> c787479d6ba7f7fe594bdbde30b87c85e2048cce

const MainContainer = styled.div`
  height: 100vh;
  width: 100vw;
  align-items: center;
  flex-wrap: wrap;
  display: flex;
  justify-content: center;
  flex-direction: row;
`;

<<<<<<< HEAD
const NavigationContainer = styled.div`
  flex-basis: 30%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  color: #04346C;
`;

const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  color: white;
  margin: 0 10px;

  &.active {
    color: gold;
  }
`;

=======
>>>>>>> c787479d6ba7f7fe594bdbde30b87c85e2048cce
const LeftContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-basis: 40%;
  align-items: normal;
  padding: 2rem;
  height: 100%;
  margin-top: 5rem;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex-basis: 50%;
`;

<<<<<<< HEAD
const App: React.FC = () => {
  const [onFileChange, setOnFileChange] = useState<File | null>(null);

  const uploadFileHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      setOnFileChange(files[0]);
    }
  };

  return (
    <MainContainer>
      <img src={logo} alt="Logo" style={{ height: '100px' }} />

      <NavigationContainer>
        <StyledNavLink to="/">Home</StyledNavLink>
        <StyledNavLink to="/about">About</StyledNavLink>
        <StyledNavLink to="/features">Features</StyledNavLink>
        <StyledNavLink to="/pricing">Pricing</StyledNavLink>
        <StyledNavLink to="/contact">Contact</StyledNavLink>
        <StyledNavLink to="/profile">
          <ButtonComponent buttonLabel="Profile" />
        </StyledNavLink>
      </NavigationContainer>

      <div style={{ flexBasis: '33%', display: 'flex' }}>
        <ButtonComponent buttonLabel="Login / Sign up" />
        <ButtonComponent buttonLabel="Download App" />
      </div>

      <div style={{ display: 'flex', height: '100%', width: '100%', alignItems: 'start' }}>
        <LeftContainer>
          <h1>Transcribe any audio file in any language!</h1>
          <h2 style={{ color: '#04346C' }}>
            We have created a translation/transcription tool to help you translate and/or transcribe any of your text and audio files.
          </h2>
          <div style={{ display: 'flex', width: '100%', justifyContent: 'flex-start' }}>
            <NavLink to="/translate_text" style={{ width: '50%' }}>
              <ButtonComponent size={'100%'} buttonLabel="Translate Text" />
            </NavLink>
            <NavLink to="/transcribe_audio" style={{ width: '50%' }}>
              <ButtonComponent size={'100%'} buttonLabel="Transcribe Audio" />
            </NavLink>
          </div>
        </LeftContainer>

        <ContentContainer>
          <img src={rightLogo} alt="Right Logo" />
        </ContentContainer>
      </div>
    </MainContainer>
  );
};
=======
const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Label = styled.label`
  margin: 1rem;
  font-weight: bold;
`;


 const App: React.FC = () => {
  const [translate, setTranslate] = useState<string>('True');

  const [onFileChange, setOnFileChange] = useState<File | null>(null);
  const [isSumitted, setIsSumitted] = useState(false);


  const handleChangeMethod = (e: React.ChangeEvent<HTMLSelectElement>) => setTranslate(e.target.value);

  const uploadFileHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files;
    if (file) {
      setOnFileChange(file[0]);
    }
  }


  return (

  <MainContainer>
    <div style={{ flexBasis: '30%', display: 'flex'}}><img src={logo}></img></div>
    <div style={{display: "flex", justifyContent: "space-evenly", width: '30%', color: "#04346C", flexBasis: '33%'}}>
      <div>Home</div>
      <div>About</div>
      <div>Features</div>
      <div>Pricing</div>
      <div>Contract</div>
    </div>
    <div style={{ flexBasis: '33%', display: 'flex'}}>
      <ButtonComponent buttonLabel="Login/ Sign up"></ButtonComponent>
      <ButtonComponent buttonLabel="Download App"></ButtonComponent>
    </div>

    <div style={{ display: 'flex', height: '100%', width: '100%', alignItems: 'start'}}>
    <LeftContainer>
      <h1>Transcribe any audio file in any language!</h1>
      <h2 style={{color: '#04346C'}}>We have created an translation/transcription tool<br/> to help you translate and/or transcribe any of your text and audio files.</h2>
      <div style={{ display: 'flex', width: '100%', justifyContent: 'flex-start'}}>
        <NavLink to="/translate_text" style={{width: '50%'}}>
            <ButtonComponent size={'100%'} buttonLabel="Translate Text"></ButtonComponent>
        </NavLink>
        <NavLink to="/transcribe_audio" style={{width: '50%'}}>
            <ButtonComponent size={'100%'} buttonLabel="Transcribe Audio"></ButtonComponent>
        </NavLink>
      </div>
    </LeftContainer>

    <ContentContainer>
      <img src={rightLogo}></img>
    </ContentContainer>
    </div>
  </MainContainer>
  )
 }
>>>>>>> c787479d6ba7f7fe594bdbde30b87c85e2048cce

export default App;