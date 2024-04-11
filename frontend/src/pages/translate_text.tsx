import React, { ChangeEvent, ChangeEventHandler, useState } from 'react'
import styled from 'styled-components';
import ButtonComponent from '../components/button';
import { SelectorComponent } from '../components/selector';
import { languageOptions } from '../data';
import { InputComponent } from '../components/input';
import { useNavigate } from "react-router-dom";
import logo from '../assets/logo.jpg';
import rightLogo from '../assets/right_logo.png';
import TranslationResult from '../components/translation_evaluation';

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


 const TranslateText: React.FC = () => {
  const [text, setText] = useState<string>('text');
  const [target, setTarget] = useState<string>('eng_Latn');
  const [source, setSource] = useState<string>('Unknown');
  const [language_choices, language_choices_setOutput] = useState([])

  const [onFileChange, setOnFileChange] = useState<File | null>(null);
  const [isSumitted, setIsSumitted] = useState(false);

  const [evaluationData, setEvaluationData] = useState<any>('');


  const handleChangeSource = (e: React.ChangeEvent<HTMLSelectElement>) => setSource(e.target.value);
  const handleChangeText = (e: React.ChangeEvent<HTMLInputElement>) => setText(e.target.value);
  const handleChangeTarget = (e: React.ChangeEvent<HTMLSelectElement>) => setTarget(e.target.value);

  const navigate = useNavigate();

  const get_language_mapping = () => {
    const response = fetch('http://0.0.0.0:8003/language_code_mapping')
      .then((response) => {
        return response.json();
      })
      .then(data => {
        language_choices_setOutput(data)
        setChange(true);
      })
  }

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    console.log(`text: ${text}`);
    console.log(`target_lang: ${target}`);
    console.log(`source_lang: ${source}`);

    const url = 'http://localhost:8003/translate';
    const queryParams = `?text=${text}&target_lang=${target}&source_lang=${source}`;

    try {
      const response = await fetch(url + queryParams, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
        },
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
      <h2>Translate Text</h2>
      {get_language_mapping()}
      <Form onSubmit={handleSubmit}>
        <Label>
          Source Language:
          <SelectorComponent options={Object.keys(language_choices)} handleChange={handleChangeSource} />
        </Label>

        <Label>
          Text:
          <InputComponent inputValue={text} handleChange={handleChangeText} />
        </Label>

        <Label>
          Target Language:
          <SelectorComponent options={languageOptions} handleChange={handleChangeTarget} />
        </Label>

        <ButtonComponent buttonLabel={isSumitted ? "Submitted" : "Send Data"}></ButtonComponent>
      </Form>
    </FormContainer>

    <ContentContainer>
      <TranslationResult data={evaluationData}  />
    </ContentContainer>
  </MainContainer>
  )
 }

export default TranslateText;