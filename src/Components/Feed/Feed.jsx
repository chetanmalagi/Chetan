import React, { useEffect, useState } from 'react';
import './Feed.css';

import { Link } from 'react-router-dom';
import { API_KEY } from '../../Data';
import moment from 'moment';

const Feed = ({ category }) => {
    const [data, setData] = useState([]);

    const fetchData = async () => {
        const videoList_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=50&regionCode=US&videoCategoryId=${category}&key=${API_KEY}`;
        const response = await fetch(videoList_url);
        const result = await response.json();
        setData(result.items);
    };

    useEffect(() => {
        fetchData();
    }, [category]);

    // Define the value_converter function
    const value_converter = (value) => {
        if (value >= 1000000) {
            return (value / 1000000).toFixed(1) + 'M';
        } else if (value >= 1000) {
            return (value / 1000).toFixed(1) + 'K';
        } else {
            return value;
        }
    };

    return (
        <div className="feed"> 
            {data.map((item, index) => (
                <Link to={`/video/${item.snippet.categoryId}/${item.id}`} className="card" key={index}>
                    <img src={item.snippet.thumbnails.medium.url} alt={item.snippet.title} />
                    <h2>{item.snippet.title}</h2>
                    <h3>{item.snippet.channelTitle}</h3>
                    <p>{value_converter(item.statistics.viewCount)} views &bull; {moment(item.snippet.publishedAt).fromNow()}</p>
                </Link>
            ))}
        </div>
    );
};

export default Feed;
