import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faSpinner, faCircleXmark } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import styles from './Search.module.scss';

const cx = classNames.bind(styles);
function Search() {
    const loading = false;
    const searchValue = [];
    return (
        <div className={cx('search-wrapper')}>
            <input
                className={cx('search-input')}
                type="text"
                value=""
                onChange={() => alert('change')}
                placeholder="Search..."
                spellCheck={false}
            />
            {loading && <FontAwesomeIcon className={cx('loading')} icon={faSpinner} />}
            {searchValue && !loading && (
                <button className={cx('clear-text')}>
                    <FontAwesomeIcon icon={faCircleXmark} />
                </button>
            )}
            <Link to={'/search'}>
                <FontAwesomeIcon className={cx('search-icon')} icon={faMagnifyingGlass} />
            </Link>
        </div>
        // </Tippy>
    );
}

export default Search;
