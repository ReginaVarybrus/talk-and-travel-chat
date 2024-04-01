import styled from 'styled-components';

export const ItemWrapp = styled.div`
    position: relative;
`

export const StyledLabel = styled.label`
    ${({ color = { error: '', touched: false } }) => ({
        display: 'block',
        fontSize: '12px',
        fontWeight: 600,
        marginBottom: '8px',
        color: color.error && color.touched
            ? 'var(--color-error)'
            : !color.error && color.touched
                ? 'var(--color-success)'
                : '#111',
    })}
`;

export const StyledInput = styled.input`
    ${({ color = { error: '', touched: false }, id }) => ({
        '@media (min-width: 768px)': {
            width: '360px',
            backgroundColor: 'var(--color-grey-4)',
        },
        width: '100%',
        color: '#111',
        fontSize: '14px',
        lineHeight: '18px',
        boxSizing: 'border-box',
        height: '56px',
        borderRadius: '8px',
        border: '1px solid',
        borderColor:
            color.error && color.touched
                ? 'var(--color-error)'
                : !color.error && color.touched
                    ? 'var(--color-success)'
                    : '#79747E',
        backgroundColor: 'var(--white-color)',
        marginBottom: '24px',
        marginTop: id === 'repeatPassword' ? '24px' : '0',
        paddingLeft: '16px',
        ':hover': {
            border: '1px solid #111',
        },
        '::placeholder': {
            color: '#49454F',
        },
    })}
`;

export const Error = styled.p`
    position: absolute;
    top: ${({ id }) => id === 'repeatPassword' ? '92px' : '70px'};
    left: 10px;
    color: var(--color-error);
    font-size: 12px;
    line-height: 14px;
    margin: 0;
    padding: 0;
`;

export const Success = styled.p`
    position: absolute;
    top: ${({ id }) => id === 'repeatPassword' ? '92px' : '70px'};
    left: 10px;
    color: var(--color-success);
    font-size: 12px;
    line-height: 14px;
    margin: 0;
    padding: 0;
`;

export const PasswordReapetLable = styled.p`
    position: absolute;
    top: 70px;
    left: 3px;
    font-size: 12px;
    line-height: 14px;
    margin: 0;
    padding-left: 14px;
    color: #49454F;
    text-align: left;
`

