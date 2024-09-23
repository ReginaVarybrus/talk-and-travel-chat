import { format } from 'date-fns';
import PropTypes from 'prop-types';

const DateSeparator = ({ date }) => (
  <div style={{ textAlign: 'center', margin: '10px 0', color: '#888' }}>
    <hr />
    <span>{format(date, 'EEEE, MMMM d')}</span>
  </div>
);

DateSeparator.propTypes = {
  date: PropTypes.instanceOf(Date).isRequired,
};

export default DateSeparator;
