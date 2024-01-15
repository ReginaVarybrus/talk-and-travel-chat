import {Loaders} from './Loader.styled';
import { RotatingLines } from 'react-loader-spinner';

export default function Loader () {
  return (
    <Loaders>
      <RotatingLines
        strokeColor="blue"
        strokeWidth="5"
        animationDuration="1.5"
        width="96"
        visible={true}
      />
    </Loaders>
  );
};


