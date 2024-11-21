import styled from 'styled-components';

export const MessageListStyled = styled.ul``;

export const HighlightedMessage = styled.div`
  &.highlight {
    animation: highlight 1s ease-out;
  }

  @keyframes highlight {
    from {
      background-color: var(--color-blue-2);
    }
    to {
      background-color: transparent;
    }
  }
`;
