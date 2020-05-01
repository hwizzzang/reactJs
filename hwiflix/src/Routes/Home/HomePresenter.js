import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';
import Section from 'Components/Section';
import Loader from 'Components/Loader';
import Message from 'Components/Message';
import Poster from 'Components/Poster';

const Container = styled.div`
    padding: 20px;
`;

const HomePresenter = ({ nowPlaying, upComing, popular, loading, error }) => (
    <>
        <Helmet>
            <title>Movies | Hwiflix</title>
        </Helmet>
        {loading ? (
            <Loader />
        ) : (
            <Container>
                {nowPlaying && nowPlaying.length > 0 && (
                    <Section title="Now Playing">
                        {nowPlaying.map((movie) => (
                            <Poster
                                key={movie.id}
                                id={movie.id}
                                imageUrl={movie.poster_path}
                                title={movie.original_title}
                                rating={movie.vote_average}
                                year={
                                    movie.release_date &&
                                    movie.release_date.substring(0, 4)
                                }
                                isMovie={true}
                            />
                        ))}
                    </Section>
                )}
                {upComing && upComing.length > 0 && (
                    <Section title="upComing Movie">
                        {upComing.map((movie) => (
                            <Poster
                                key={movie.id}
                                id={movie.id}
                                imageUrl={movie.poster_path}
                                title={movie.original_title}
                                rating={movie.vote_average}
                                year={
                                    movie.release_date &&
                                    movie.release_date.substring(0, 4)
                                }
                                isMovie={true}
                            />
                        ))}
                    </Section>
                )}
                {popular && popular.length > 0 && (
                    <Section title="Popular Movie">
                        {popular.map((movie) => (
                            <Poster
                                key={movie.id}
                                id={movie.id}
                                imageUrl={movie.poster_path}
                                title={movie.original_title}
                                rating={movie.vote_average}
                                year={
                                    movie.release_date &&
                                    movie.release_date.substring(0, 4)
                                }
                                isMovie={true}
                            />
                        ))}
                    </Section>
                )}
                {error && <Message color="#e74c3c" text={error} />}
            </Container>
        )}
    </>
);

HomePresenter.propTypes = {
    nowPlaying: PropTypes.array,
    upComing: PropTypes.array,
    popular: PropTypes.array,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.string,
};

export default HomePresenter;
