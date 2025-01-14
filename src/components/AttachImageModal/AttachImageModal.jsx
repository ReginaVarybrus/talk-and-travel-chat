import Backdrop from '@mui/material/Backdrop';
import Fade from '@mui/material/Fade';
import PropTypes from 'prop-types';
// import { axiosClient } from '@/services/api';
// import download from 'downloadjs';
import axios from 'axios';

import { IoCloseOutline, IoCloudDownloadOutline } from 'react-icons/io5';
import { CloseBtn } from '@/components/CountryInfo/CountryInfoStyled.js';
import { SendedImage } from '@/components/ModalAttachFile/ModalAttachFileStyled.js';
import { ModalWindowStyled } from '@/components/UserInfoModal/UserInfoModalStyled.js';
import { InfoModalStyled, DownloadBtn } from './AttachImageModalStyled';

const AttachImageModal = ({ openImage, handleCloseImage, imgUrl }) => {
  const handleDownload = async () => {
    try {
      const response = await axios.get(imgUrl, { responseType: 'blob' });
      const blob = new Blob([response.data]);
      const contentType = response.headers['content-type'];
      const extension = contentType.split('/')[1];
      const filename = `image.${extension}`;

      const url = URL.createObjectURL(blob);

      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  };

  return (
    <ModalWindowStyled
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={openImage}
      onClose={handleCloseImage}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={openImage}>
        <InfoModalStyled>
          <CloseBtn onClick={handleCloseImage}>
            <IoCloseOutline />
          </CloseBtn>
          <hr style={{ margin: '24px 0' }} />
          <SendedImage src={imgUrl} alt="opened file" />
          <hr style={{ margin: '24px 0' }} />
          <DownloadBtn onClick={handleDownload}>
            <IoCloudDownloadOutline />
          </DownloadBtn>
        </InfoModalStyled>
      </Fade>
    </ModalWindowStyled>
  );
};

AttachImageModal.propTypes = {
  openImage: PropTypes.bool,
  handleCloseImage: PropTypes.func,
  imgUrl: PropTypes.string,
};

export default AttachImageModal;
