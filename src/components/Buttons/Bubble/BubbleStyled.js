import styled from 'styled-components';

export const BubbleStyled = styled.div`
  position: relative;
  left: ${props => props.$left};
  border: 1px solid var(--color-brand-blue);
  border-radius: 107px;
  padding: 16px;
  font-size: 24px;
  line-height: 28.8px;
  margin-bottom: ${props => props.$marginbottom};
  display: flex;
  align-items: flex-end;
  gap: 16px;
`;