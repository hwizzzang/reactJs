import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Section from 'Components/Section';
import Loader from 'Components/Loader';
import Message from 'Components/Message';

const Container = styled.div`
    padding: 0px 10px;
`;

const HomePresenter = ({ nowPlaying, upComing, popular, loading, error }) =>
    loading ? (
        <Loader />
    ) : (
        <Container>
            {nowPlaying && nowPlaying.length > 0 && (
                <Section title="Now Playing">
                    {nowPlaying.map((movie) => (
                        <span key={movie.id}>{movie.title}</span>
                    ))}
                </Section>
            )}
            {upComing && upComing.length > 0 && (
                <Section title="upComing Movie">
                    {popular.map((movie) => (
                        <span key={movie.id}>{movie.title}</span>
                    ))}
                </Section>
            )}
            {popular && popular.length > 0 && (
                <Section title="Popular Movie">
                    {popular.map((movie) => (
                        <span key={movie.id}>{movie.title}</span>
                    ))}
                </Section>
            )}
            {error && <Message color="#e74c3c" text={error} />}
        </Container>
    );

HomePresenter.propTypes = {
    nowPlaying: PropTypes.array,
    upComing: PropTypes.array,
    popular: PropTypes.array,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.string,
};

export default HomePresenter;
