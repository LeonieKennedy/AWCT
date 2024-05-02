import React from 'react';
import styled from 'styled-components';

<<<<<<< HEAD
export const Button = styled.button<{ $size?: string, disabled?: boolean }>`
    width: ${props => props.$size || '40%'};
    height: 40px;
    flex: 0 0 auto;
    border-color: rgb(207, 217, 222);
    background-color: ${props => props.disabled ? "#ccc" : "white"};  // Example of conditional styling based on disabled state
    color: ${props => props.disabled ? "#666" : "black"};
    display: flex;
    align-items: center;
    margin: 1rem;
    cursor: ${props => props.disabled ? "not-allowed" : "pointer"};
    opacity: ${props => props.disabled ? 0.5 : 1};  // Reduced opacity for disabled state
`;

const ButtonComponent: React.FC<{ buttonLabel: string, size?: string, disabled?: boolean }> = ({ buttonLabel, size, disabled }) => {
    return (
        <Button $size={size} disabled={disabled}>
            {buttonLabel}
        </Button>
    );
}

export default ButtonComponent;
=======
export const Button = styled.button<{$size?: string}>`
    width: ${props => props.$size ||'40%' };
    height: 40px;
    flex: 0 0 auto;
    border-color: rgb(207, 217, 222);
    background-color: "white";
    color: "black";
    display: flex;
    align-items: center;
    margin: 1rem;
`;

const ButtonComponent: React.FC<{ buttonLabel: string, size?: string
    }> = ({buttonLabel, size}) => {
    return (
        <Button $size={size}>
            {buttonLabel}
        </Button>
    )
}

export default ButtonComponent
>>>>>>> c787479d6ba7f7fe594bdbde30b87c85e2048cce
