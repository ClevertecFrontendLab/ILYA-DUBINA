import React from 'react';
import Lottie from 'lottie-react';
import animationData from './loader.json';
import './spinerLoading.css';

export const SpinerLoading: React.FC = () => {
    return (
        <div className='spiner'>
            <div className='spiner__content'>
                <Lottie
                    data-test-id='loader'
                    animationData={animationData}
                    loop={true}
                    autoplay={true}
                    style={{ height: '150px' }}
                />
            </div>
        </div>
    );
};
