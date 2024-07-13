import React, { useEffect, useState } from 'react';
import './Recommended.css';
import { API_KEY } from '../../Data';
import { Link } from 'react-router-dom';

const value_converter = (value) => {
    if (value >= 1000000) {
        return (value / 1000000).toFixed(1) + 'M';
    } else if (value >= 1000) {
        return (value / 1000).toFixed(1) + 'K';
    } else {
        return value;
    }
};

const Recommended = ({ categoryId }) => {
    const [apiData, setApiData] = useState([]);

    const fetchData = async () => {
        const relatedVideo_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=30&regionCode=US&videoCategoryId=${categoryId}&key=${API_KEY}`;
        const response = await fetch(relatedVideo_url);
        const data = await response.json();
        setApiData(data.items);
    };

    useEffect(() => {
        fetchData();
    }, [categoryId]);

    return (
        <div className='recommended'>
            {apiData.map((item, index) => (
                <Link to={`/video/${item.snippet.categoryId}/${item.id}`} key={index} className="side-video-list">
                    <img src={item.snippet.thumbnails.medium.url} alt={item.snippet.title} />
                    <div className="vid-info">
                        <h4>{item.snippet.title}</h4>
                        <p>{item.snippet.channelTitle}</p>
                        <p>{value_converter(item.statistics.viewCount)} views</p>
                    </div>
                </Link>
            ))}
        </div>
    );
};

export default Recommended;
