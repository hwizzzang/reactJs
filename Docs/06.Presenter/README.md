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
                        <span key={movie.id}>{movie.title}</span> // span 추가
                    ))}
                </Section>
            )}
            {upComing && upComing.length > 0 && (
                <Section title="upComing Movie">
                    {popular.map((movie) => (
                        <span key={movie.id}>{movie.title}</span> // span 추가
                    ))}
                </Section>
            )}
            {popular && popular.length > 0 && (
                <Section title="Popular Movie">
                    {popular.map((movie) => (
                        <span key={movie.id}>{movie.title}</span> // span 추가
                    ))}
                </Section>
            )}
        </Container>
    );
(...)
```

위 코드에서 `span`을 추가한 것처럼 TVPresenter에서도 동일하게 수정을 해줍니다.

## 6.3 SearchPresenter and Loader Components

다음은 SearchPresenter을 작업하겠습니다.

### **src/Routes/Search/SearchPresenter**

```javascript
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Section from 'Components/Section';

const Container = styled.div`
    padding: 0 20px;
`;

const Form = styled.form`
    margin-bottom: 50px;
    width: 100%;
`;

const Input = styled.input`
    all: unset;
    font-size: 28px;
    width: 100%;
`;

const SearchPresenter = ({
    movieResults,
    tvResults,
    error,
    searchTerm,
    loading,
    handleSubmit,
    updateTerm,
}) => (
    <Container>
        <Form onSubmit={handleSubmit}>
            <Input
                type="text"
                placeholder="Search Movies or TV Shows"
                value={searchTerm}
                onChange={updateTerm}
            />
        </Form>
    </Container>
);

SearchPresenter.propTypes = {
    movieResults: PropTypes.array,
    tvResults: PropTypes.array,
    error: PropTypes.string,
    searchTerm: PropTypes.string,
    loading: PropTypes.bool.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    updateTerm: PropTypes.func.isRequired,
};

export default SearchPresenter;
```

form에서는 submit 기본 이벤트를 차단할 것이며 input도 가지고 있어야합니다.

searchContainer에서 이전에 작성한 코드를 살펴보면 handleSubmit은 searchTerm과 searchs들을 찾아야하므로 form 안에 input을 생성해줍니다.

`input`에서 `value`를 가지는 이유는 `input`을 제어할 수 있어야 하기 때문인데요. search movies나 tv shows는 `input`의 `value`를 추적해야 할 필요가 있기 때문에 입력한 값에 연결해야합니다.

### **src/Routes/Search/SearchContainer**

```javascript
(...)
export default class extends React.Component {
    state = {
        movieResults: null,
        tvResults: null,
        searchTerm: 'test', // 값 입력 test
        loading: false,
        error: null,
    };
    (...)
}
(...)
```

위의 SearchContainer에서 `searchTerm`에 값을 입력해보면 `input`은 입력한 값을 기본 `value`로 가지게됩니다. 이는 movies, shows 둘 다 `state`를 가지고 있기 때문인데요.
`value={searchTerm}`을 삭제해도 여전히 작동합니다. `value`를 얻기 위해서는 `state`에 `searchTerm`이 있어야합니다.

테스트 이전으로 돌아가, 현재 상태에서 입력이 안 되는 이유는 update에 관한 `value`가 있는 함수를 만들지 않았기 때문인데요.

이 함수를 만들기 전에 form에서 `submit`을 해보겠습니다. ENTER를 누르면 form에 submitting 되어 값이 전송됩니다.

여기서, 이 동작의 문제는 브라우저가 page를 새로고침하게 되면서 상태(state)를 잃어버리게됩니다.

해결 방법으로 이벤트를 가로채는 방법이 있는데, 밑의 코드와 같이 해당 이벤트를 차단해주면 됩니다.

### **src/Routes/Search/SearchContainer**

```javascript
(...)
export default class extends React.Component {
    (...)
    handleSubmit = (event) => {
        if (event) {
            event.preventDefault();
        }
        (...)
    };
}
(...)
```

Presenter처럼 스타일도 추가해줍니다.

### **src/Routes/Search/SearchPresenter**

```javascript
(...)
const Container = styled.div`
    padding: 0 20px;
`;

const Form = styled.form`
    margin-bottom: 50px;
    width: 100%;
`;

const Input = styled.input`
    all: unset;
    font-size: 28px;
    width: 100%;
`;
(...)
```

밑의 코드처럼 update function을 만들어준 후 SearchPresenter에 전달해줍니다.

### **src/Routes/Search/SearchContainer**

```javascript
export default class extends React.Component {

    (...)

    updateTerm = (event) => { // update function
        const {
            target: { value },
        } = event;

        console.log(value)

        this.setState({
            searchTerm: value,
        });
    };

    (...)

    render() {

        (...)

        return (
            <SearchPresenter
                movieResults={movieResults}
                tvResults={tvResults}
                loading={loading}
                searchTerm={searchTerm}
                error={error}
                handleSubmit={this.handleSubmit}
                updateTerm={this.updateTerm} // 추가
            />
        );
    }
}
```

updateTerm 함수에서 event 매개변수는 target를 가지고 target은 value를 갖습니다.(비구조화할당)

`console.log(value)`을 출력해보면 단 하나의 letter만을 출력하는데요. 이는 `this.setState({});`를 사용하면됩니다.

검색 결과는 network에서 확인할 수 있는데, newwork 관련된 것들을 clear한 후 submit하면 자동으로 검색하게됩니다.

밑에서는 loading event에 대한 결과를 보여주겠습니다

### **src/Routes/Search/SearchPresenter**

```javascript
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Section from 'Components/Section';
import Loader from 'Components/Loader';

(...)

const SearchPresenter = ({
    movieResults,
    tvResults,
    error,
    searchTerm,
    loading,
    handleSubmit,
    updateTerm,
}) => (
    <Container>
        <Form onSubmit={handleSubmit}>
            (...)
        </Form>
        {loading ? ( //  loading event result
            <Loader /> // 로딩중이면 로더를 보여줌
        ) : ( // 로딩중이 아니라면 movie results or show results
            <> // fragment 사용
                {movieResults && movieResults.length > 0 && (
                    <Section title="Movie Results">
                        {movieResults.map((movie) => (
                            <span key={movie.id}>{movie.title}</span>
                        ))}
                    </Section>
                )}
                {tvResults && tvResults.length > 0 && (
                    <Section title="TV Show Results">
                        {tvResults.map((show) => (
                            <span key={show.id}>{show.name}</span>
                        ))}
                    </Section>
                )}
            </>
        )}
    </Container>
);

SearchPresenter.propTypes = {
    movieResults: PropTypes.array,
    tvResults: PropTypes.array,
    error: PropTypes.string,
    searchTerm: PropTypes.string,
    loading: PropTypes.bool.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    updateTerm: PropTypes.func.isRequired,
};

export default SearchPresenter;
```

이제 검색 결과가 화면에서 보이는데요. 검색 시 결과가 없을 때의 상황도 고려하여 작업해야합니다.

## 6.4 Message Component

error text와 not found text 작업을 하겠습니다.

### **src/Components/Error.js**

```javascript
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.div`
    width: 100vw;
    display: flex;
    justify-content: center;
`;

const Text = styled.span`
    color: #e74c3c;
`;

const Error = ({ text }) => (
    <Container>
        <Text>{text}</Text>
    </Container>
);

Error.propTypes = {
    text: PropTypes.string.isRequired,
};

export default Error;
```

HomePresenter에 error시 보여줄 Error 컴포넌트를 작성해줍니다.

### **src/Routes/Home/HomePresenter.js**

```javascript
(...)
import Error from 'Components/Error'; // 추가

const HomePresenter = ({ nowPlaying, upComing, popular, loading, error }) =>
    loading ? (
        <Loader />
    ) : (
        <Container>
            (...)
            {error && <Error text={error} />} // 추가
        </Container>
    );
(...)
```

HomeContainer에서 에러를 발생시켜보면 Home page에서는 'Can't find movies information.' 문구가 보입니다. 문구가 확인되면 에러 발생시킨 부분을 삭제한 후 위의 코드와 동일하게 search, tv 컴포넌트에도 똑같이 error 컴포넌트를 추가해줍니다. 에러는 throw로 각 Container에서 확인합니다.

### **src/Routes/Home/HomeContainer.js**

```javascript
export default class extends React.Component {
    (...)

    async componentDidMount() {
        try {
            const {
                data: { results: nowPlaying },
            } = await moviesApi.nowPlaying();
            const {
                data: { results: upComing },
            } = await moviesApi.upComing();
            const {
                data: { results: popular },
            } = await moviesApi.popular();
            throw Error(); // error 발생
            this.setState({
                nowPlaying,
                upComing,
                popular,
            });
        } catch {
            this.setState({
                error: "Can't find movies information.",
            });
        } finally {
            this.setState({
                loading: false,
            });
        }
    }

    (...)
}
```

다음은 404 페이지를 만들겠습니다.

### **src/Components/NotFound.js**

```javascript
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.div`
    width: 100vw;
    display: flex;
    justify-content: center;
`;

const Text = styled.span`
    color: #95a5a6;
`;

const NotFound = ({ text }) => (
    <Container>
        <Text>{text}</Text>
    </Container>
);

NotFound.propTypes = {
    text: PropTypes.string.isRequired,
};

export default NotFound;
```

Error 페이지와 NotFound 페이지의 코드가 비슷하므로 Message.js 합쳐주겠습니다. Error.js 페이지와 NotFound.js는 삭제합니다. Error.js를 import 했던 HomePresenter.js에서도 Message.js를 import 하는 방식으로 수정해줍니다.

### **src/Components/Message.js**

```javascript
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.div`
    width: 100vw;
    display: flex;
    justify-content: center;
`;

const Text = styled.span`
    color: ${(props) => props.color};
`;

const Message = ({ text, color }) => (
    <Container>
        <Text color={color}>{text}</Text>
    </Container>
);

Message.propTypes = {
    text: PropTypes.string.isRequired,
    color: PropTypes.string.isRequired,
};

export default Message;
```

SearchPresenter.js에서 Message.js를 import 하고 검색어를 찾지 못했을 때의 상태를 보여줍니다.

```javascript

(...)
const SearchPresenter = ({
    movieResults,
    tvResults,
    error,
    searchTerm,
    loading,
    handleSubmit,
    updateTerm,
}) => (
    <Container>
        (...)
        {error && <Message color="#e74c3c" text={error} />}
        {tvResults && // 추가
            movieResults &&
            tvResults.length === 0 &&
            movieResults.length === 0 && (
                <Message color="#95a5a6" text="Nothing found" />
            )}
    </Container>
);
(...)
```

## 6.5 Poster Component part One

다음은 Poster.js 파일을 생성해줍니다.

Poster.js는 Movie나 tvShow와 관련이 있으며 이를 표현합니다.

### **src/Components/Poster**

```javascript
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div``;

const ImageContainer = styled.div``;

const Image = styled.div``;

const Rating = styled.span``;

const Title = styled.span``;

const Year = styled.span``;

const Poster = ({ imageUrl, title, rating, year, isMovie = false }) => (
    <Link to={isMovie ? `/movie/${id}` : `/show/${id}`}>
        <Container>
            <ImageContainer>
                <Image bgUrl={imageUrl} />
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

```

위의 Poster 컴포넌트를 HomePresenter에서 사용해보도록하겠습니다. 그리고 TVPresenter, SearchPresenter에서도 HomePresenter와 같이 수정해줍니다. 

### **src/Routes/Home/HomePresenter.js**

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
                            idMovie={true}
                        />
                    ))}
                </Section>
            )}
            {upComing && upComing.length > 0 && (
                <Section title="upComing Movie">
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
                            idMovie={true}
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
                            idMovie={true}
                        />
                    ))}
                </Section>
            )}
            {error && <Message color="#e74c3c" text={error} />}
        </Container>
    );
(...)
```

```javascript
year={
    movie.release_date &&
    movie.release_date.substring(0, 4)
}
```

위의 코드와 같이 작성하는 이유는 `substring`을 사용할 때 release_date가 빈 값일 경우 substring은 function이 아니라고 에러가 발생합니다. undefined는 substring을 가지고 있지 않는데요. 오류가 날 수 있으므로 `substring`은 release_data가 존재할 때만 사용할 수 있도록 만들어줘야합니다. 위와 같이 작성하면 모든것은 release_date를 가지고 있다는 것을 알기 때문에 substring을 사용할 것입니다.