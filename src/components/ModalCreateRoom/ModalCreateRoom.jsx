import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import { ModalBoxStyled, Buttons, Button } from './ModalCreateRoomStyled.js';

const ModalCreateRoom = ({
  open,
  setOpen,
  handleCreateCountryRoom,
  selectedCountry,
}) => {
  const handleClose = () => setOpen(false);
  const handleCreateChat = () => {
    handleCreateCountryRoom();
  };

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <ModalBoxStyled>
            <h5>
              {selectedCountry} room does not exist yet. Want to create a new
              one?
            </h5>
            <Buttons>
              <Button onClick={handleCreateChat}>Create</Button>
              <Button onClick={handleClose}>No, thanks</Button>
            </Buttons>
          </ModalBoxStyled>
        </Fade>
      </Modal>
    </div>
  );
};

export default ModalCreateRoom;
