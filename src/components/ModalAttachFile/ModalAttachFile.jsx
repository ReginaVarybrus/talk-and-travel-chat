import { useState } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Fade from '@mui/material/Fade';
import PropTypes from 'prop-types';
import URLs from '@/constants/constants';
import { axiosClient } from '@/services/api';
import { IoCloseOutline } from 'react-icons/io5';
import { CloseBtn } from '@/components/CountryInfo/CountryInfoStyled.js';
import ConfirmBlock from '@/components/ConfirmBlock/ConfirmBlock.jsx';
import Loader from '@/components/Loader/Loader';
import {
  ModalWindowStyled,
  InfoModalStyled,
} from '@/components/UserInfoModal/UserInfoModalStyled.js';

import { SendedImage, LoaderStyleBox } from './ModalAttachFileStyled.js';

const ModalAttachFile = ({
  open,
  handleClose,
  selectedFile,
  setSelectedFile,
  chatId,
  src,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  // Attachment image feature
  const handleUpload = async () => {
    if (!selectedFile) return alert('Please select a file first!');

    setIsLoading(true);

    const formData = new FormData();
    formData.append('content', 'Image');
    formData.append('chatId', chatId);
    formData.append('attachmentType', 'IMAGE');
    formData.append('file', selectedFile);

    try {
      const response = await axiosClient.post(
        URLs.getMessages(chatId),
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (response.status === 202) {
        console.log('Image uploaded successfully:', response.data);
      }
    } catch (error) {
      console.error('Error uploading file:', error);
    } finally {
      setIsLoading(false);
      setSelectedFile(null);
      handleClose();
    }
  };

  return (
    <ModalWindowStyled
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
        <InfoModalStyled>
          <CloseBtn onClick={handleClose}>
            <IoCloseOutline />
          </CloseBtn>
          <h5>Send an image</h5>

          <hr style={{ margin: '24px 0' }} />
          {isLoading ? (
            <LoaderStyleBox>
              <Loader size={50} />
            </LoaderStyleBox>
          ) : (
            <SendedImage src={src} alt="sended file" />
          )}
          <hr style={{ margin: '24px 0' }} />
          <ConfirmBlock
            onConfirm={handleUpload}
            onCancel={handleClose}
            confirmText="Yes, send"
            cancelText="Cancel"
          />
        </InfoModalStyled>
      </Fade>
    </ModalWindowStyled>
  );
};

ModalAttachFile.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  selectedFile: PropTypes.shape({
    lastModified: PropTypes.number,
    lastModifiedDate: PropTypes.instanceOf(Date),
    name: PropTypes.string,
    size: PropTypes.number,
    type: PropTypes.string,
    webkitRelativePath: PropTypes.string,
  }),
  setSelectedFile: PropTypes.func,
  chatId: PropTypes.number,
};

export default ModalAttachFile;
