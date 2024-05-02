import React, { useEffect, useState } from 'react';
import StyledProfileContainer from '../components/ProfileContainer'; // Assume the styled container includes proper exports
import Sidebar from '../components/Sidebar';
import MainContent from '../components/MainContent';
import { Translation, Transcription } from '../types';
import styled from 'styled-components';


const DataSection = styled.div`
  margin-top: 20px;
  padding: 30px; 
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15); 
`;

const DataItem = styled.div`
  padding: 25px;
  margin-bottom: 25px;
  background-color: #f3f3f3; 
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  line-height: 1.6;
`;

const LangLine = styled.div`
  margin-bottom: 15px;
  font-size: 18px;
  font-weight: bold;
  color: #333;
`;

const TranslatedText = styled(LangLine)`
  color: #0056b3;
  font-weight: normal;
`;

const Button = styled.button`
  background: linear-gradient(135deg, #ff416c, #ff4b2b); 
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s, box-shadow 0.2s;

  &:hover {
    background: linear-gradient(135deg, #ff4b2b, #ff416c); 
    transform: scale(1.05); 
    box-shadow: 0 4px 15px rgba(255, 65, 108, 0.4); 
  }

  svg {
    margin-right: 8px; // Space between icon and text
  }
`;

const DisabledButton = styled(Button)`
  background-color: #bbb;
  &:hover {
    background-color: #aaa;
  }
`;

const Profile: React.FC = () => {
  const [translations, setTranslations] = useState<Translation[]>([]);
  const [transcriptions, setTranscriptions] = useState<Transcription[]>([]);
  const [error, setError] = useState('');
  const [userInfo, setUserInfo] = useState<any>(null);
  const [currentPage, setCurrentPage] = useState<'profile' | 'recentHistory'>('profile');

  useEffect(() => {
    const userData = {
      userName: 'John Doe',
      joinDate: 'January 1, 2022',
    };
    setUserInfo(userData);
    fetchLatestData('translations');
    fetchLatestData('transcriptions');
  }, []);

  const fetchLatestData = async (dataType: 'translations' | 'transcriptions') => {
    try {
      const response = await fetch(`http://localhost:8002/latest_data/default_user/${dataType}?count=3`);
      if (!response.ok) throw new Error(`Failed to fetch ${dataType}: ${await response.text()}`);
      const data = await response.json();
      if (dataType === 'translations') setTranslations(data.data.map((item: any) => ({
        text: item.text,
        sourceLang: item.source_lang,
        targetLang: item.target_lang,
        translatedText: item.translated.join(', ')
      })));
      else setTranscriptions(data.data);
    } catch (error) {
      console.error(`Failed to fetch ${dataType}:`, error);
    }
  };

  const deleteData = async (dataType: 'translations' | 'transcriptions', index: number) => {
    try {
      await fetch(`http://localhost:8002/delete/default_user/${dataType}`, { method: 'DELETE' });
      dataType === 'translations' ? setTranslations(prev => prev.filter((_, i) => i !== index)) : setTranscriptions(prev => prev.filter((_, i) => i !== index));
    } catch (error) {
      console.error(`Failed to delete ${dataType}:`, error);
      setError(`Error: Could not delete data`);
    }
  };

  return (
    <StyledProfileContainer>
      <Sidebar>
        <h2>User Profile</h2>
        <ul>
          <li><a href="/">Home</a></li>
          <li><button onClick={() => setCurrentPage('profile')}>Profile</button></li>
          <li><button onClick={() => setCurrentPage('recentHistory')}>Recent History</button></li>
          <li><DisabledButton>Profile Settings</DisabledButton></li>
          <li><DisabledButton>Account Info</DisabledButton></li>
        </ul>
      </Sidebar>
      <MainContent>
        <h1>User Profile</h1>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {currentPage === 'profile' && userInfo && (
          <DataSection>
            <h2>Profile Information</h2>
            <DataItem>
              <LangLine>Username: {userInfo.userName}</LangLine>
              <LangLine>Joined: {userInfo.joinDate}</LangLine>
            </DataItem>
          </DataSection>
        )}
        {currentPage === 'recentHistory' && (
          <>
            <DataSection>
              <h2>Translations History</h2>
              {translations.length > 0 ? translations.map((translation, index) => (
                <DataItem key={index}>
                  <LangLine>Source Language: {translation.sourceLang}</LangLine>
                  <LangLine>Original Text: {translation.text}</LangLine>
                  <LangLine>Target Language: {translation.targetLang}</LangLine>
                  <TranslatedText>Translated: {translation.translatedText}</TranslatedText>
                  <Button onClick={() => deleteData('translations', index)}>Delete</Button>
                </DataItem>
              )) : <p>No translations found</p>}
            </DataSection>
            <DataSection>
              <h2>Transcriptions History</h2>
              {transcriptions.length > 0 ? transcriptions.map((transcription, index) => (
                <DataItem key={index}>
                  {transcription.transcription}
                  <Button onClick={() => deleteData('transcriptions', index)}>Delete</Button>
                </DataItem>
              )) : <p>No transcriptions found</p>}
            </DataSection>
          </>
        )}
      </MainContent>
    </StyledProfileContainer>
  );
};

export default Profile;