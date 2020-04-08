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

`loading: PropTypes.bool.isRequired` 이 코드에서 `isRequired`를 붙이면 이는 필수적으로 있어야한다는 뜻이 됩니다.

## 6.1 HomePresenter and Section Components

다음은 section을 만들 건데, section은 해당 Route안에 들어갈 내용들을 안에 넣게됩니다. 우선 Section.js 파일을 만들어줍니다.

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
import Section from 'Components/Section'; // Section 호출

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

상단에서는 이전에 만들어 둔 `Section` 컴포넌트를 불러옵니다(import).

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

일반적으로 리액트에서 `children`은 태그 사이의 값을 받아옵니다. 따라서 `children`은 `Section` 태그 사이의 movie가 됩니다.

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

```javascript
(...)

const HomePresenter = ({ nowPlaying, upComing, popular, loading, error }) =>
    loading ? null : (
        <Container>
            {nowPlaying && nowPlaying.length > 0 && (
                <Section title="Now Playing">
                    {nowPlaying.map((movie) => movie.title)}
                </Section>
            )}
            {upComing && upComing.length > 0 && ( // 추가
                <Section title="upComing Movie">
                    {popular.map((movie) => movie.title)}
                </Section>
            )}
            {popular && popular.length > 0 && ( // 추가
                <Section title="Popular Movie">
                    {popular.map((movie) => movie.title)}
                </Section>
            )}
        </Container>
    );

(...)
```

Section.js로 이동하여 now playing에서 스타일을 변경해줍니다.

### **src/Conponents/Section.js**

```javascript
(...)
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
`;
(...)
```

## 6.2 TVPresenter and Loader Components

TVPresenter도 HomePresenter와 동일하게 작업해줍니다.

### **src/Routes/Tv/TvPresenter.js**

```javascript
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Section from 'Components/Section';

const Container = styled.div`
    padding: 0 10px;
`;

const TVPresenter = ({ topRated, popular, airingToday, loading, error }) =>
    loading ? null : (
        <Container>
            {topRated && topRated.length > 0 && (
                <Section title="Top Rated Shows">
                    {topRated.map((show) => show.name)}
                </Section>
            )}
            {popular && popular.length > 0 && (
                <Section title="Popular Shows">
                    {popular.map((show) => show.name)}
                </Section>
            )}
            {airingToday && airingToday.length > 0 && (
                <Section title="Airing Today">
                    {airingToday.map((show) => show.name)}
                </Section>
            )}
        </Container>
    );

TVPresenter.propTypes = {
    topRated: PropTypes.array,
    popular: PropTypes.array,
    airingToday: PropTypes.array,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.string,
};

export default TVPresenter;

```

여기서 문제는 각 카테고리를 클릭했을 때 빈 페이지가 보였다가 로딩이됩니다. Loader를 생성하여 빈 페이지에 보여주도록 하겠습니다.

loader도 component를 만들겠습니다

### **src/Components/Loader.js**

```javascript
import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;

    span {
        font-size: 24px;
    }
`;

const Loader = () => (
    <Container>
        <span role="img" aria-label="Loading">
            👀
        </span>
    </Container>
);

export default Loader;

```

위의 코드에서 이모지는 screen reader를 위해 span으로 감싼 후 image role을 추가하여 접근하기 쉽도록 해야합니다.

그리고 Presenter(Home,TV)로 돌아가 `loading ? null ~` 을 `loading ? <Loader />` 로 변경해줍니다.

### **src/Route/Home/HomePresenter.js**

```javascript
(...)

const HomePresenter = ({ nowPlaying, upComing, popular, loading, error }) =>
    loading ? (
        <Loader /> // 변경
    ) : (

        (...)
    );

(...)
```

여기서 중요한 부분은, HomePresenter는 항상 Load 되어야합니다. length나 map에 의해 시작하면 loaded되지 않아 작동하지 않게됩니다. 따라서 추가로 두 개의 stage로 loading과 load를 확인해야합니다.

다음은 Search를 작업합니다. `input`과 `sections`를 이용한 result, 그리고 실제 포스터들을 가져와 만들도록 하겠습니다.

### **src/Components/Section.js**

```javascript
(...)
const Grid = styled.div`
    margin-top: 25px;
    display: grid; // 추가
    grid-template-columns: repeat(auto-fill); // 추가
    grid-gap: 25px; // 추가
`;
(...)
```

다음은 movie와 show 제목의 스타일을 수정해주겠습니다.

### **src/Route/Home/HomePresenter.js**

```javascript
(...)
const HomePresenter = ({ nowPlaying, upComing, popular, loading, error }) =>
    loading ? (
        <Loader />
    ) : (
        <Container>
            {nowPlaying && nowPlaying.length > 0 && (
                <Section title="Now Playing">
                    {nowPlaying.map((movie) => (
                        <span>{movie.title}</span> // span 추가
                    ))}
                </Section>
            )}
            {upComing && upComing.length > 0 && (
                <Section title="upComing Movie">
                    {popular.map((movie) => (
                        <span>{movie.title}</span> // span 추가
                    ))}
                </Section>
            )}
            {popular && popular.length > 0 && (
                <Section title="Popular Movie">
                    {popular.map((movie) => (
                        <span>{movie.title}</span> // span 추가
                    ))}
                </Section>
            )}
        </Container>
    );
(...)
```

위 코드에서 `span`을 추가한 것처럼 TVPresenter에서도 동일하게 수정을 해줍니다.

<!-- 6.2 정리, 코드 작성 완료 / 6.3 시작 -->
