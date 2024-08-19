import avatarImage from '@/images/img/Avatar.png';
import { LuLogOut } from 'react-icons/lu';
import { IoCloseOutline } from 'react-icons/io5';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { FaRegMessage } from 'react-icons/fa6';
import Modal from '@mui/material/Modal';
import {
  BoxWrap,
  ContactsList,
  ContactsWrap,
  ButtonsWrap,
  Flag,
  Item,
  Avatar,
  CloseBtn,
  UserWrap,
  MessageBtn,
  CountryWrap,
  CountryNameWrap,
  ExitBtn,
  ReportBtn,
} from './CountryInfoStyled.js';

const CountryInfo = ({ open, onClose, countryName }) => {
  const members = [
    { name: 'Anna', email: 'anna@gmail.com', avatar: avatarImage },
    { name: 'Bob', email: 'bob@gmail.com', avatar: avatarImage },
    { name: 'Joanna', email: 'joanna@gmail.com', avatar: avatarImage },
    { name: 'Tomas', email: 'tomas@gmail.com', avatar: avatarImage },
    { name: 'JohnDou', email: 'johndou@gmail.com', avatar: avatarImage },
  ];
  return (
    <Modal
      aria-labelledby="country-info-title"
      aria-describedby="country-info-description"
      open={open}
      onClose={onClose}
    >
      <BoxWrap>
        <CloseBtn onClick={onClose} type="button">
          <IoCloseOutline />
        </CloseBtn>
        <CountryWrap>
          <Flag />
          <CountryNameWrap>
            {/* change to selected country */}
            <h5>Ukraine</h5>
            {/* change to real memders number */}
            <p>1555 members</p>
          </CountryNameWrap>
        </CountryWrap>
        <ContactsWrap>
          <ContactsList>
            {/* change to real members array */}
            {members.map(user => (
              <Item key={user.name}>
                <Avatar>
                  <img src={user.avatar} alt={user.name} />
                </Avatar>
                <UserWrap>
                  <h5>{user.name}</h5>
                  <p>{user.email}</p>
                </UserWrap>
                <MessageBtn type="button">
                  <FaRegMessage />
                </MessageBtn>
              </Item>
            ))}
          </ContactsList>
        </ContactsWrap>
        <ButtonsWrap>
          <ExitBtn type="button">
            <LuLogOut />
            Leave group
          </ExitBtn>
          <ReportBtn type="button">
            <HiOutlineExclamationCircle />
            Report
          </ReportBtn>
        </ButtonsWrap>
      </BoxWrap>
    </Modal>
  );
};
export default CountryInfo;
