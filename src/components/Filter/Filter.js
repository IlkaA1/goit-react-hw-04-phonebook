import css from './filter.module.css';
import PropTypes from 'prop-types';

const Filter = ({ value, onChange }) => {
  return (
    <>
      <label>
        Find contacts by name
        <input
          type="text"
          value={value}
          onChange={onChange}
          className={css.input}
        ></input>
      </label>
    </>
  );
};

Filter.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
export default Filter;
