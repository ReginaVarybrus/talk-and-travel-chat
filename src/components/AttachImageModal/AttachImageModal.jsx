import Backdrop from '@mui/material/Backdrop';
import Fade from '@mui/material/Fade';
import PropTypes from 'prop-types';
import { axiosClient } from '@/services/api';
// eslint-disable-next-line import/no-extraneous-dependencies
import fileDownload from 'js-file-download';
import { IoCloseOutline, IoCloudDownloadOutline } from 'react-icons/io5';
import { CloseBtn } from '@/components/CountryInfo/CountryInfoStyled.js';
import { SendedImage } from '@/components/ModalAttachFile/ModalAttachFileStyled.js';
import { ModalWindowStyled } from '@/components/UserInfoModal/UserInfoModalStyled.js';
import { InfoModalStyled, DownloadBtn } from './AttachImageModalStyled';

const AttachImageModal = ({ openImage, handleCloseImage, imgUrl, src }) => {
  const handleDownloadFile = async (url, filename) => {
    console.log('download file in process...');
    console.log('attach', imgUrl);

    try {
      const response = await axiosClient.get(url, {
        responseType: 'blob',
      });

      fileDownload(response.data, filename);
    } catch (error) {
      console.error('Error downloading file:', error);
    }
  };

  const handleDownload = () => {
    handleDownloadFile(imgUrl, 'download-file');
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
          <SendedImage src={src} alt="opened file" />
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
  src: PropTypes.string,
};

export default AttachImageModal;
