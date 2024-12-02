import PropTypes from 'prop-types';
import { ConfirmBlockStyled, Button } from './ConfirmBlockStyled.js';

const ConfirmBlock = ({
  onConfirm,
  onCancel,
  confirmText = 'Yes',
  cancelText = 'Cancel',
}) => (
  <ConfirmBlockStyled>
    <Button $confirm onClick={onConfirm}>
      {confirmText}
    </Button>
    <Button $confirm={false} onClick={onCancel}>
      {cancelText}
    </Button>
  </ConfirmBlockStyled>
);

ConfirmBlock.propTypes = {
  onConfirm: PropTypes.func,
  onCancel: PropTypes.func,
  confirmText: PropTypes.string,
  cancelText: PropTypes.string,
};

export default ConfirmBlock;
