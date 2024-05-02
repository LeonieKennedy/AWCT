import React from 'react'
import styled from 'styled-components';
import { InputComponent } from '../components/input';
<<<<<<< HEAD
=======
import ButtonComponent from './button';

export const Text = styled.p`
  color: rgb(83, 100, 113);
  width: 277px;
  font-size: 1rem;
`;
>>>>>>> c787479d6ba7f7fe594bdbde30b87c85e2048cce

const EvaluationContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  flex-basis: 40%;
  align-items: center;
  padding: 2rem;
  background-color: #000C4B;
  color: white;
  margin-left: 1rem;
  border-radius: 1rem;
`;

<<<<<<< HEAD
const EvaluationWrapper = styled.div`
=======
const EvalutionWrapper = styled.div`
>>>>>>> c787479d6ba7f7fe594bdbde30b87c85e2048cce
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Label = styled.label`
  margin: 1rem;
  font-weight: bold;
`;

type PropType = {
<<<<<<< HEAD
  data: any; 
}

export default function TranscriptionResult({ data }: PropType) {
  console.log('Data received:', data);
  
  const transcription = data && data.transcription ? data.transcription : "No transcription available.";

  return (
    <EvaluationContainer>
      <h2>Transcription Result</h2>
      <EvaluationWrapper>
        <Label>
          Transcription:
          <InputComponent inputValue={transcription} readOnly />
        </Label>
      </EvaluationWrapper>
    </EvaluationContainer>
  );
}
=======
  data: any; // replace 'any' with a more specific type if you can
}

export default function TranscriptionResult({data}: PropType) {

  return (
    <EvaluationContainer>
      <h2>Result</h2>
      <EvalutionWrapper >
        <Label>
          Transcription:
          <InputComponent inputValue={data.transcription}  />
        </Label>
      </EvalutionWrapper>
    </EvaluationContainer>
  )
}
>>>>>>> c787479d6ba7f7fe594bdbde30b87c85e2048cce
