import React, { ChangeEvent, ChangeEventHandler, useState } from 'react'
import styled from 'styled-components';
import Evaluation from '../components/evaluation';
import ButtonComponent from '../components/button';
import { SelectorComponent } from '../components/selector';
import { translateOptions } from '../data';
import { InputComponent } from '../components/input';
import logo from '../assets/logo.jpg';
import rightLogo from '../assets/right_logo.png';
import { NavLink } from 'react-router-dom';

const MainContainer = styled.div`
  height: 100vh;
  width: 100vw;
  align-items: center;
  flex-wrap: wrap;
  display: flex;
  justify-content: center;
  flex-direction: row;
`;

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
      <h2 style={{color: '#04346C'}}>We have created an audio translation/transcription tool<br/> to help you translate and/or transcribe any of your audio files.</h2>
      <div style={{ display: 'flex', width: '100%', justifyContent: 'flex-start'}}>
        <ButtonComponent size={'20%'} buttonLabel="Login"></ButtonComponent>
        <NavLink to="/transcribe_audio" style={{width: '50%'}}>
        <ButtonComponent size={'40%'} buttonLabel="Try Demo"></ButtonComponent>
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

export default App;