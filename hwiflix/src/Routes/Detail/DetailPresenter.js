import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';
import Loader from 'Components/Loader';
import Message from 'Components/Message';

const Container = styled.div`
    position: relative;
    width: 100%;
    height: calc(100vh - 50px);
    padding: 50px;
`;

const Backdrop = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: url(${(props) => props.bgImage});
    background-position: center center;
    background-size: cover;
    filter: blur(3px);
    opacity: 0.5;
    z-index: 0;
`;

const Content = styled.div`
    display: flex;
    position: relative;
    width: 100%;
    height: 100%;
    z-index: 1;
`;

const Cover = styled.div`
    width: 30%;
    height: 100%;
    background-image: url(${(props) => props.bgImage});
    background-position: center center;
    background-size: cover;
    border-radius: 5px;
`;

const Data = styled.div`
    width: 70%;
    margin-left: 10px;
`;

const Title = styled.h3`
    font-size: 32px;
`;

const ItemContainer = styled.div`
    margin: 20px 0;
`;

const Item = styled.span``;

const Divider = styled.span`
    margin: 0px 10px;
`;

const OverView = styled.p`
    width: 50%;
    line-height: 1.5;
    font-size: 12px;
    opacity: 0.7;
`;

const DetailPresenter = ({ result, loading, error }) =>
    loading ? (
        <Loader />
    ) : error ? (
        <Message color="#e74c3c" text={error} />
    ) : (
        <Container>
            <Helmet>
                <title>
                    {result.original_title
                        ? result.original_title
                        : result.original_name}{' '}
                    | Nomflix
                </title>
            </Helmet>
            <Backdrop
                bgImage={
                    result.backdrop_path
                        ? `https://image.tmdb.org/t/p/original${result.backdrop_path}`
                        : require('../../assets/noPosterSmall.png')
                }
            />
            <Content>
                <Cover
                    bgImage={
                        result.poster_path
                            ? `https://image.tmdb.org/t/p/original${result.poster_path}`
                            : require('../../assets/noPosterSmall.png')
                    }
                />
                <Data>
                    <Title>
                        {result.original_title
                            ? `${result.original_title}`
                            : result.original_name
                            ? `${result.original_name}`
                            : `undefined`}
                    </Title>
                    <ItemContainer>
                        <Item>
                            {result.release_date
                                ? `${result.release_date.substring(0, 4)}`
                                : result.first_air_date
                                ? `${result.first_air_date.substring(0, 4)}`
                                : `undefined`}
                        </Item>
                        <Divider>•</Divider>
                        <Item>
                            {result.runtime
                                ? `${result.runtime} min`
                                : result.episode_run_time[0]
                                ? `${result.episode_run_time[0]} min`
                                : 'undefined'}
                            {/* result.runtime
                                ? `${result.runtime} min`
                                : result.episode_run_time[0]
                                ? `${result.episode_run_time[0]} min`
                                : 'undefined' */}
                            {/* {result.runtime ? result.runtime :
                            result.episode_run_time[0]} */}
                        </Item>
                        <Divider>•</Divider>
                        {}
                        <Item>
                            {result.genres &&
                                result.genres.map((genre, index) =>
                                    // index : 마지막 친구 제외
                                    index === result.genres.length - 1
                                        ? genre.name
                                        : `${genre.name} / `,
                                )}
                        </Item>
                    </ItemContainer>
                    <OverView>{result.overview}</OverView>
                </Data>
            </Content>
        </Container>
    );

DetailPresenter.propTypes = {
    result: PropTypes.object,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.string,
};
export default DetailPresenter;
