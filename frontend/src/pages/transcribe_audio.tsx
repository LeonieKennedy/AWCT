import React, { ChangeEvent, ChangeEventHandler, useState } from 'react'
import styled from 'styled-components';
import ButtonComponent from '../components/button';
import { SelectorComponent } from '../components/selector';
import { translateOptions } from '../data';
import { InputComponent } from '../components/input';
import { useNavigate } from "react-router-dom";
import Checkbox from '@mui/material/Checkbox';
import logo from '../assets/logo.jpg';
import rightLogo from '../assets/right_logo.png';
import TranscriptionResult from '../components/transcription_evaluation';
import FormControlLabel from "@mui/material/FormControlLabel";


const MainContainer = styled.div`
  min-height: 100vh;
  width: 100vw;
  align-items: center;
  flex-wrap: wrap;
  display: flex;
  justify-content: center;
  flex-direction: row;
`;

const FormContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  flex-basis: 40%;
  align-items: center;
  padding: 2rem;
  background-color: #000C4B;
  color: white;
  border-radius: 1rem;
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


 const TranscribeAudio: React.FC = () => {
  const [translate, setTranslate] = useState(false);

  const [onFileChange, setOnFileChange] = useState<File | null>(null);
  const [isSumitted, setIsSumitted] = useState(false);

  const [evaluationData, setEvaluationData] = useState<any>('');

  const handleChangeTranslate = (e: React.ChangeEvent<any>) => setTranslate(e.target.value);

  const navigate = useNavigate();

  const uploadFileHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files;
    if (file) {
      setOnFileChange(file[0]);
    }
  }

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    console.log(`translate: ${translate}`);

    const formData = new FormData();
    if (onFileChange !== null) {
      formData.append('audio_file', onFileChange);
    }


    const url = 'http://localhost:8002/transcribe';
    const queryParams = `?translate=${translate}`;

      try {
      const response = await fetch(url + queryParams, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
        body: formData,
        mode: 'cors',
      });

      console.log("response", response.body)

      if (response.ok) {
        console.log('API request completed successfully');
        setIsSumitted(true);

        const responseData = await response.json();
        console.log('Response body:', responseData);
        setEvaluationData(responseData);

      } else {
        console.log('API request failed');
      }
    } catch (error) {
      console.log('An error occurred:', error);
    }
  }

  return (

  <MainContainer>

    <div style={{ flexBasis: '30%', display: 'flex'}}><img src={logo}></img></div>
    <div style={{display: "flex", justifyContent: "space-evenly", width: '30%', color: "#04346C", flexBasis: '33%'}}>
    </div>
    <div style={{ flexBasis: '33%', display: 'flex'}}>
      <ButtonComponent buttonLabel="Logout"></ButtonComponent>
      <ButtonComponent buttonLabel="Download App"></ButtonComponent>
    </div>


    <FormContainer>
      <h2>Transcribe Audio</h2>
      <Form onSubmit={handleSubmit}>

        <FormControlLabel
          control={<Checkbox name="translate" checked={translate} onChange={handleChangeTranslate} />}
          label="Translate Audio"
        />
        <Label>
            Please upload your audio file.
            <input
              id="file-input"
              type="file"
              accept=".flac"
              onChange={uploadFileHandler}
            />
        </Label>
        <ButtonComponent buttonLabel={isSumitted ? "Submitted" : "Send Data"}></ButtonComponent>
      </Form>
    </FormContainer>

    <ContentContainer>
      <TranscriptionResult data={evaluationData}  />
    </ContentContainer>
  </MainContainer>
  )
 }

export default TranscribeAudio;