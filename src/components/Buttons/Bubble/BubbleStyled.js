import styled from 'styled-components';
import star from '@/images/icons/small_star.svg'

export const BubbleStyled = styled.div`
position: absolute;
border: 1px solid var(--color-brand-blue);
border-radius: 107px;
padding: 17.5px 16px;
padding-left: 58px;
font-size: 24px;
line-height: 28.8px;
margin-bottom: ${props => props.position.marginBottom};

&:before {
    content: '';
    position: absolute;
    top: 50%;
    left: 16px;
    transform: translateY(-50%);
    width: 32px;
    height: 32px;
    mask-image: url(${star});
    mask-size: contain;
    mask-repeat: no-repeat;
    background-color: var(--color-brand-blue);
  }`