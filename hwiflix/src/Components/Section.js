import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.div`
    :not(:last-child) {
        margin-bottom: 50px;
    }
`;

const Title = styled.span`
    font-size: 16px;
    font-weight: 600;
`;

const Grid = styled.div`
    margin-top: 25px;
    display: grid;
    grid-template-columns: repeat(auto-fill, 125px);
    grid-gap: 25px;
`;

// children은 예약된 react prop
const Section = ({ title, children }) => (
    <Container>
        <Title>{title}</Title>
        <Grid>{children}</Grid>
    </Container>
);

Section.propTypes = {
    title: PropTypes.string.isRequired,
    // oneOfType : 여러 종류 중 하나의 종류가 될 수 있는 객체
    children: PropTypes.oneOfType([
        // arrayOf : 특정 타입의 행렬
        PropTypes.arrayOf(PropTypes.node),
        // node : 렌더링 될 수 있는 것들은 다음과 같음.
        // 숫자, 문자, 엘리먼트, 또는 이러한 타입들(types)을 포함하고 있는 배열, 혹은 배열의 fragment
        PropTypes.node,
    ]),
};

export default Section;
