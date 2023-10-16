import { useEffect, useRef, useState } from 'react';
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
        // <Tippy
        //     interactive
        //     visible={showResult && searchResult.length > 0}
        //     render={(attrs) => (
        //         <div className={cx('search-result')} tabIndex="-1" {...attrs}>
        //             <PopperWrapper>
        //                 <div className={cx('search-heading')}>
        //                     <h4 className={cx('search-title')}>Film</h4>
        //                     <Link to="/search" className={cx('search-seemore')} onClick={handleHideResult}>
        //                         See more
        //                     </Link>
        //                 </div>
        //                 {searchResult.map((result) => (
        //                     <MovieItemSearch key={result.id} data={result} onClick={handleHideResult} />
        //                 ))}
        //             </PopperWrapper>
        //         </div>
        //     )}
        //     onClickOutside={handleHideResult}
        // >
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
