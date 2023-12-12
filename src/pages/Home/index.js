import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import styles from './Home.module.scss';
import axios from 'axios';
import baseUrl from '~/config/baseUrl';
function Home() {
    // const [show, setShow] = useState(false);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await axios.get('http://localhost:8082/api/post/posts');
                setPosts(response.data);
                //   const city = post.location;
                console.log(response.data);
            } catch (error) {
                console.error('Get post failed', error);
            }
        };
        fetchPost();
    }, []);
    return (
        <div>
            <div className={styles.post}>
                <ul className={styles.postFrame}>
                    {posts.map((post, index) => (
                        <li key={index} className={styles.postItem}>
                            <span className={styles.headerPost}>
                                <img
                                    className={styles.postImage}
                                    alt="hotelPicture"
                                    src={baseUrl.image + 'room80.jpg'}
                                />
                            </span>
                            <ul className={styles.bodyPost}>
                                <li className={styles.postBodyItem}>{post.hotelNameDto}</li>
                                <li className={styles.postBodyItem}>Address: {post.addressDto}</li>
                                <li className={styles.postBodyItem}>Description: {post.titleDto}</li>
                                {/* {console.log(post.address)} */}
                                <li className={styles.postBodyItem}>Rate: {post.ratedto}</li>
                            </ul>
                            <div className={styles.footerPost}>
                                <div className={styles.postFooterItemHeader}>
                                    <div className={styles.postFooterItemHeaderTitle}>
                                        Owner Hotel: {post.usernameDto}
                                    </div>
                                    <div className={styles.postFooterItemHeaderContent}>{post.descriptionDto}</div>
                                    <div className={styles.postFooterItemHeaderFooter}>
                                        {/* <div>{post.price}</div> */}

                                        <Link to={`/hotel/${post.hotelId}`} className={styles.linkPost}>
                                            <button className={styles.postFooterItemHeaderFooterBtn}>
                                                View Detail
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                                <div className={styles.postFooterItemBlock}>
                                    {/* <div className={styles.postFooterItemBlockItemLeft}>
                                        <div>Price</div>
                                        <div>{post.price}</div>
                                    </div> */}
                                    <div className={styles.postFooterItemBlockItemRight}>
                                        <div>Discount</div>
                                        <div>{post.discount * 100}% </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Home;
