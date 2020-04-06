import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.div``;

const Title = styled.span``;

const Grid = styled.div``;

// children은 예약된 react prop
const Section = ({ title, children }) => (
    <Container>
        <Title>{title}</Title>
        <Grid>{children}</Grid>
    </Container>
);

Section.propTypes = {
    title: PropTypes.string.isRequired,
    // 여러 종류 중 하나의 종류가 될 수 있는 객체
    children: PropTypes.oneOfType([
        // 특정 타입의 행렬
        PropTypes.arrayOf(PropTypes.node),
        // 렌더링 될 수 있는 것들은 다음과 같음.
        // 숫자, 문자, 엘리먼트, 또는 이러한 타입들(types)을 포함하고 있는 배열, 혹은 배열의 fragment
        PropTypes.node,
    ]),
};

export default Section;
