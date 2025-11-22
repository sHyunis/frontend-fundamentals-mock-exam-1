import styled from '@emotion/styled';
import { keyframes } from '@emotion/react';
import { colors } from 'tosslib';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

export function LoadingSpinner() {
  return (
    <Container>
      <Spinner />
    </Container>
  );
}

const Container = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Spinner = styled.div`
  width: 32px;
  height: 32px;
  border: 3px solid ${colors.grey200};
  border-top-color: ${colors.blue500};
  border-radius: 50%;
  animation: ${spin} 0.8s linear infinite;
`;
