import React from 'react';
import styled from 'styled-components';

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