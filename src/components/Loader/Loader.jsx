import { RotatingLines } from 'react-loader-spinner';
import { Loaders } from './Loader.styled';

export default function Loader({ size = 96 }) {
  return (
    <Loaders>
      <RotatingLines
        strokeColor="blue"
        strokeWidth="5"
        animationDuration="1.5"
        width={size}
        visible
      />
    </Loaders>
  );
}
