import styled from 'styled-components';

export const MessageItemStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  margin: 24px 32px;
`;

export const MessageContent = styled.ul`
  display: flex;
  align-items: end;
  max-width: 280px;
  padding: 16px;
  border-radius: 8px;
  background: var(--color-blue-1);
`;

export const Name = styled.p`
  text-align: start;
  font-size: 20px;
  font-weight: 700;
  margin: 0 0 5px 5px;
  color: var(--color-brand-blue);
`;

export const Text = styled.p`
  text-align: start;
  font-size: 16px;
  color: var(--color-dark);
`;

export const Time = styled.span`
  text-align: center;
  font-size: 12px;
  margin-left: 8px;
  color: var(--color-grey-9);
`;
