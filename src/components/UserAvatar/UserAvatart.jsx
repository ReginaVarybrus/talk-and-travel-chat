import { Avatar } from './UserAvatarStyles.js';

const UserAvatar = ({ responseData }) => {
  const compileAvatar = () => {
    const base64String = btoa(
      new Uint8Array(responseData).reduce(
        (data, byte) => data + String.fromCharCode(byte),
        ''
      )
    );
    return `data:image/png;base64,${base64String}`;
  };
  return <Avatar src={compileAvatar()} alt="avatar" />;
};

export default UserAvatar;
