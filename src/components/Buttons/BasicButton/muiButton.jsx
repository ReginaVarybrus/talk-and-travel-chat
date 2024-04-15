import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

export const MyButton = styled(Button)(props => ({
  borderRadius: props.radius ? props.radius : 15,
}));
