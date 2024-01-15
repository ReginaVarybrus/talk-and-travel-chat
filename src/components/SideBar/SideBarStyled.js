import styled from 'styled-components';

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    min-width: 120px;
    height: 100vh;
    border-right: 1px solid #c8c8c8;
    /* background: #E9F0FB; */
    background: var(--color-blue-1);
`; 

export const ProfileBox = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    width: 56px;
    height: 76px;
    margin-top: 48px;
    cursor: pointer;
`; 

/* export const ProfileBoxAvatar = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 48px;
    height: 48px;
    border: 1px solid #222222;
`; */

export const Frame = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    width: 51px;
    height: 166px;
`; 

export const LogOutBox = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    width: 56px;
    height: 76px;
    margin-bottom: 48px;
`; 


/* export const LogOutButton = styled.button`
    width: 48px;
    height: 48px;
    border-radius: 4px;
    background: #c6c6c6;
    border: none;
    cursor: pointer;
`; */