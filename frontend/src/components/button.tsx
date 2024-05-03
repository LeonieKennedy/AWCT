import React from 'react';
import styled from 'styled-components';

// Define the styled button component
export const Button = styled.button<{ $size?: string }>`
    width: ${props => props.$size || '40%'};
    height: 40px;
    flex: 0 0 auto;
    border-color: rgb(207, 217, 222);
    background-color: "white";
    color: "black";
    display: flex;
    align-items: center;
    margin: 1rem;
`;

// Define the ButtonComponent
interface ButtonProps {
    buttonLabel: string;
    size?: string;
    onClick?: () => void;
}

const ButtonComponent: React.FC<ButtonProps> = ({ buttonLabel, size, onClick }) => {
    return (
        <Button $size={size} onClick={onClick}>
            {buttonLabel}
        </Button>
    )
}

export default ButtonComponent;
