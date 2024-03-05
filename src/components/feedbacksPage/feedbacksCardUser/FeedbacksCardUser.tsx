import { TextBlock } from '../../../global/component';
import { StarFilled, StarOutlined } from '@ant-design/icons';
import avatar from '../../../images/feedback/avatar.svg';
import React from 'react';
import './feedbacksCardUser.css';

type props = {
    createdAt: string;
    id: string;
    message: string;
    rating: number;
    fullName: null | string;
    imageSrc: null | string;
};
export const FeedbacksCardUser: React.FC<props> = ({
    createdAt,
    message,
    rating,
    fullName,
    imageSrc,
}) => {
    const arrFullName = fullName ? fullName.split(' ') : ['', ''];
    const arrRating = [];
    for (let i = 1; i <= 5; i++) {
        if (rating >= i) {
            arrRating.push(<StarFilled />);
        } else {
            arrRating.push(<StarOutlined />);
        }
    }
    const date = new Date(createdAt);
    const yyyy = date.getFullYear();
    let mm: string | number = date.getMonth() + 1;
    let dd: string | number = date.getDate();
    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;
    const formatted = dd + '.' + mm + '.' + yyyy;
    return (
        <TextBlock addClassNameBlock='card'>
            <div className='card__container'>
                <figure className='card__container_image'>
                    <img
                        className='image__card'
                        src={imageSrc ? imageSrc : avatar}
                        alt='картинка пользователя'
                    />
                    <figcaption className='image__title'>
                        {!arrFullName[0] && !arrFullName[1] ? (
                            'Пользователь'
                        ) : (
                            <>
                                <span>{arrFullName[0]}</span>
                                <span>{arrFullName[1]}</span>
                            </>
                        )}
                    </figcaption>
                </figure>
                <div className='card__container_description'>
                    <div className='description__estimation'>
                        <div className='description__estimation_stars'>
                            {arrRating.map((item, i) => (
                                <React.Fragment key={i}>{item}</React.Fragment>
                            ))}
                        </div>
                        <span className='description__estimation_date'>{formatted}</span>
                    </div>
                    <p className='description__text'>{message}</p>
                </div>
            </div>
        </TextBlock>
    );
};
