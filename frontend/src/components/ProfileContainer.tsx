import React, { FC, ReactNode } from 'react';
import styled from 'styled-components';
import rightLogo from '../assets/right_logo.png'; 
import logo from '../assets/logo.jpg';

const Container = styled.div`
  display: flex;
  padding: 20px;
`;

export const StyledProfileContainer = styled(Container)`
  background-color: white;
  position: relative;
  background-image: url(${rightLogo}), url(${logo});
  background-position: right bottom, 20px 20px;
  background-repeat: no-repeat, no-repeat;
  background-size: 800px 800px, auto;
  border-radius: 8px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  margin: 20px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  min-height: 100%;
  display: flex;
`;

interface Props {
    children?: ReactNode;
}

const ProfileContainer: FC<Props> = ({ children }) => {
  return <StyledProfileContainer>{children}</StyledProfileContainer>;
};

export default ProfileContainer;
