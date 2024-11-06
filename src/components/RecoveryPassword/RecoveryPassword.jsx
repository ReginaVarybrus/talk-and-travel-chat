import Modal from '@mui/material/Modal';
import { IoCloseOutline } from 'react-icons/io5';

import { BoxStyled, CloseBtn } from './RecoveryPasswordStyled';

const RecoveryPassword = ({ isOpen, onClose }) => {
  console.log();
  return (
    <Modal
      aria-labelledby="country-info-title"
      aria-describedby="country-info-description"
      open={isOpen}
      onClose={onClose}
      closeAfterTransition
    >
      <BoxStyled>
        <CloseBtn onClick={onClose}>
          <IoCloseOutline />
        </CloseBtn>
      </BoxStyled>
    </Modal>
  );
};

export default RecoveryPassword;
