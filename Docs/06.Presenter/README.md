# 6. Presenter

## 6.0 Presenter Structure

각 Route의 Presenter에 props를 받아와주고 PropTypes를 사용하여 타입을 체크해줍니다. HomePresenter를 예시로 다른 Route의 Presenter도 작성해줍니다.

### **src/Route/HomePresenter**

```javascript
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const HomePresenter = ({ nowPlaying, upComing, popular, loading, error }) =>
    null;

HomePresenter.PropTypes = {
    nowPlaying: PropTypes.array,
    upComing: PropTypes.array,
    popular: PropTypes.array,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.string,
};

export default HomePresenter;
```

여기서 `isRequired`를 붙이면 이는 필수적으로 있어야한다는 뜻이 됩니다.

## 6.1 HomePresenter and Section Components

다음은 section을 만들 건데, 해당 Route안에 들어갈 내용들을 section안에 넣게됩니다. 우선 Section.js 파일을 만들어줍니다.

### **src/Components/Section.js**

```javascript
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.div``;

const Title = styled.span``;

const Grid = styled.div``;

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
```

다음은 `HomePresenter`로 이동해서 코드를 수정해보겠습니다.

### **src/Routes/Home/HomePresenter.js**

```javascript
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Section from 'Components/Section';

const Container = styled.div`
    padding: 0px 10px;
`;

const HomePresenter = ({ nowPlaying, upComing, popular, loading, error }) =>
    loading ? null : (
        <Container>
            {nowPlaying && nowPlaying.length > 0 && (
                <Section title="now playing">movie</Section>
            )}
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
```

상단에서는 이전에 만들어 둔 `Section` 컴포넌트를 불러옵니다.

```javascript
const HomePresenter = ({ (...) }) => loading ? null : (<Container>(...)<Container/>)
```

`loading` 할 때 `nowPlaying`은 존재하지 않으므로 따로 로딩 상태를 체크해야합니다. 로딩중일 때 `null`, 로딩중이 아닐 때(로딩이 끝났을 때) `Container`를 보여줍니다.

```javascript
<Container>
    {nowPlaying && nowPlaying.length > 0 && (
        <Section title="now playing">movie</Section>
    )}
</Container>
```

`Container`를 보여줄 때 nowPlaying의 존재도 체크해야합니다. nowPlaying이 `true`일 때, nowPlaying의 `length`가 0 이상일 때 `Section`을 보여줍니다.

일반적으로 리액트에서 children은 태그 사이의 값을 받아옵니다. 따라서 `children`은 `Section` 태그 사이의 movie가 됩니다.

다음은 map()을 사용하여 nowPlaying의 `title`과 `children`을 가져와줍니다.

```javascript
<Container>
    {nowPlaying && nowPlaying.length > 0 && (
        <Section title="now playing">
            {nowPlaying.map((movie) => movie.title)}
        </Section>
    )}
</Container>
```

다른 props(upComing, popular)도 똑같이 가져와줍니다.