import styled from 'styled-components';
import SimpleBar from 'simplebar-react';

export const ScrollBar = styled(SimpleBar)`
  max-height: calc(100vh - 200px);
`;

export const MessageListStyled = styled.ul`
  flex-direction: column;
  align-items: start;
`;
