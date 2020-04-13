import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
    font-size: 12px;
`;

const ImageContainer = styled.div``;

const Image = styled.div`
    height: 180px;
    border-radius: 4px;
    background-image: url(${(props) => props.bgUrl});
    background-size: cover;
    background-position: center center;
    transition: opacity 0.1s linear;
`;

const Rating = styled.span``;

const Title = styled.span``;

const Year = styled.span``;

const Poster = ({ id, imageUrl, title, rating, year, isMovie = false }) => (
    <Link to={isMovie ? `/movie/${id}` : `/show/${id}`}>
        <Container>
            <ImageContainer>
                <Image
                    bgUrl={
                        imageUrl
                            ? `https://image.tmdb.org/t/p/w300${imageUrl}`
                            : null
                        // 여기까지 완료
                    }
                />
                <Rating>
                    <span role="img" aria-label="rating">
                        🌟
                    </span>
                    {''}
                    {rating}/10
                </Rating>
            </ImageContainer>
            <Title>{title}</Title>
            <Year>{year}</Year>
        </Container>
    </Link>
);

Poster.propTypes = {
    id: PropTypes.number.isRequired,
    imageUrl: PropTypes.string,
    title: PropTypes.string.isRequired,
    rating: PropTypes.number,
    year: PropTypes.string,
    isMovie: PropTypes.bool,
};

export default Poster;
