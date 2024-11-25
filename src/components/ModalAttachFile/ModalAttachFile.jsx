import Backdrop from '@mui/material/Backdrop';
import Fade from '@mui/material/Fade';
import PropTypes from 'prop-types';
import URLs from '@/constants/constants';
import { axiosClient } from '@/services/api';
import { IoCloseOutline } from 'react-icons/io5';
import { CloseBtn } from '@/components/CountryInfo/CountryInfoStyled.js';
import {
  ModalWindowStyled,
  InfoModalStyled,
  ConfirmBlock,
} from '@/components/UserInfoModal/UserInfoModalStyled.js';

import { PreSendImage } from './ModalAttachFileStyled.js';

const ModalAttachFile = ({ open, handleClose, selectedFile, chatId, src }) => {
  // Attachment image feature
  const handleUpload = async () => {
    if (!selectedFile) return alert('Please select a file first!');

    const dataToSend = {
      content: 'Uploaded an image',
      chatId,
      // repliedMessageId : number,
      attachmentType: 'IMAGE',
      file: selectedFile,
    };

    // const formData = new FormData();
    // formData.append('content', 'Uploaded an image');
    // formData.append('chatId', chatId);
    // formData.append('attachmentType', 'IMAGE');
    // formData.append('file', selectedFile);

    try {
      const response = await axiosClient.post(
        URLs.getMessages(chatId),
        dataToSend,
        // formData,
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

          <hr />
          <PreSendImage src={src} alt="sended file" />
          <hr />
          <ConfirmBlock>
            <button type="button" className="confirm" onClick={handleUpload}>
              Yes, send
            </button>
            <button type="button" className="cancel" onClick={handleClose}>
              Cancel
            </button>
          </ConfirmBlock>
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
  chatId: PropTypes.number,
};

export default ModalAttachFile;
