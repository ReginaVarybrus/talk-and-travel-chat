import { useState } from 'react';
import Backdrop from '@mui/material/Backdrop';
import { Box } from '@mui/material';
import Modal from '@mui/material/Modal';

const CountryInfo = () => {
  const [openModal, setOpenModal] = useState(false);
  const handleOpen = () => setOpenModal(true);
  const handleClose = () => setOpenModal(false);

  return (
    <div>
      <button type="button" onClick={handleOpen}>
        Show info
      </button>

      <Modal
        aria-labelledby="country-info-title"
        aria-describedby="country-info-description"
        open={openModal}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{ backdrop: { timeout: 500 } }}
      >
        <Box>
          <p>Modal Content</p>
          <button onClick={handleClose} type="button">
            Close Modal
          </button>
        </Box>
      </Modal>
    </div>
  );
};

export default CountryInfo;
