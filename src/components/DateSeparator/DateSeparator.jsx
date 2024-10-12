import { format } from 'date-fns';
import PropTypes from 'prop-types';
import {
  SeparatorBoxStyled,
  Line1,
  Line2,
  DateText,
} from './DateSeparatorStyles';

const DateSeparator = ({ date }) => (
  <SeparatorBoxStyled>
    <Line1 />
    <DateText>{format(date, 'EEEE, MMMM d')}</DateText>
    <Line2 />
  </SeparatorBoxStyled>
);

DateSeparator.propTypes = {
  date: PropTypes.instanceOf(Date).isRequired,
};

export default DateSeparator;
