import { Avatar } from './UserAvatarStyled.js';

const UserAvatar = ({ responseData, handleOpen, size, sizeTablet }) => {
  const compileAvatar = () => {
    const base64String = btoa(
      new Uint8Array(responseData).reduce(
        (data, byte) => data + String.fromCharCode(byte),
        ''
      )
    );
    return `data:image/png;base64,${base64String}`;
  };

  return (
    <Avatar
      onClick={handleOpen}
      src={compileAvatar()}
      $size={size}
      $sizeTablet={sizeTablet}
      alt="avatar"
    />
  );
};

export default UserAvatar;
