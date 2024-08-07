import { Avatar } from './UserAvatarStyled.js';

const UserAvatar = ({ responseData, handleOpen }) => {
  const compileAvatar = () => {
    const base64String = btoa(
      new Uint8Array(responseData).reduce(
        (data, byte) => data + String.fromCharCode(byte),
        ''
      )
    );
    return `data:image/png;base64,${base64String}`;
  };

  return <Avatar onClick={handleOpen} src={compileAvatar()} alt="avatar" />;
};

export default UserAvatar;
