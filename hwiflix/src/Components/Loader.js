import React from 'react';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;

    span {
        font-size: 24px;
        margin-top: 20px;
    }
`;

const Loader = () => (
    <Container>
        <Helmet>
            <title> Loading | Hwiflix </title>
        </Helmet>
        <span role="img" aria-label="Loading">
            👀
        </span>
    </Container>
);
// 여기서 이모지는 span으로 감싸져 있어야 하고, image role이 있어야하며 접근하기 쉬워야합니다
// screen reader를 위함

// 그리고 Presenter로 돌아가 loading ? null ~ 을 loading ? <Loader /> 로 변경

export default Loader;
