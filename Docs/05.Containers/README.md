# 5. Containers

## 5.0 Container Presenter Pattern part One

이전에 작성한 API verbs, functions 데이터들을 화면에 보이도록 만들어보겠습니다.

여기서 다룰 접근방식은, 리액트 컴포넌트 코딩 패턴입니다. 이를 컨테이너 프리젠터 패턴이라 부르는데요. 앞서 만든 라우터를 사용하기 위해 모든 컨테이너랑 프리젠터를 생성할 것입니다.

**Container + Presenter Pattern**

- container : 논리 담당. data와 state(상태값)를 가지고 api를 불러오는 등 모든 로직 처리. (데이터)
- presenter : UI 담당. 일반적인 함수형 컴포넌트로, state(상태값)을 갖고있지 않으며 api나 class와 관련 없음. (스타일)

src/Route 경로에 Route와 동일한 명으로 디렉토리를 생성해주고, 그 안에 index.js를 생성해줍니다.
index.js는 컨테이너를 export 해야하므로 모든 곳에서 생성해야합니다.

Home 컨테이너부터 생성해보도록 하겠습니다. index.js에서 home container를 import 합니다.

### **src/Route/Home/HomeContainer.js**

```javascript
(...)
```

### **src/Route/Home/index.js**

```javascript
import HomeContainer from './HomeContainer';

export default HomeContainer;
```

여기까지가 index 파일의 작업입니다.

HomeContainer은 state(상태값)을 가진 모든 리액트 컴포넌트가 됩니다.

### **src/Route/Home/HomeContainer.js**

```javascript
import React from 'react';
import HomePresenter from './HomePresenter';

```

HomePresenter.js 파일도 생성해줍니다.

### **src/Route/Home/HomePresenter.js**

```javascript
export default () => 'home';
```
## 5.1 Container Presenter Pattern part Two

다시 HomeContainer로 돌아와서 상태값을 작성해줍니다. 그리고 render 해주는데, 여기서 object destructuring(객체 비구조화 할당)을 사용합니다

### **HomeContainer**

```javascript
import React from 'react';
import HomePresenter from './HomePresenter';

export default class extends React.Component {
    state = {
        nowPlaying: null,
        upComing: null,
        popular: null,
        error: null,
        loading: true,
    };

    // 여기에 모든 로직 추가 (api 가져오기, error 처리, HomePresenter로 바로 가는 state값을 렌더링)

    render() {
        // 객체 비구조화 할당
        const { nowPlaying, upComing, popular, error, loading } = this.state;

        return (
            <HomePresenter
                nowPlaying={nowPlaying}
                upComing={upComing}
                popular={popular}
                error={error}
                loading={loading}
            />
        );
    }
}
```

Home 이외에 Detail, Search, TV Router도 동일하게 파일을 생성하여 각 동작에 맞는 상태를 지정합니다.

## 5.2 Home Comtainer

다음은 Home Container 작업을 해보겠습니다.

컴포넌트가 마운트 되었을 때, nowPlaying, upcoming, popular을 찾고 이후에 state 값을 설정해줍니다. error가 있으면 loading을 false로 변경합니다.

`componentDidMount()`에는 두 가지 옵션이 있습니다.

첫 번째로는 전체 API 요청을 할 수 있거나, 각각의 요청을 분리된 함수로 만들어 따로 요청할 수 있습니다. 예를 들어 `getNowPlaying()`, `getUpcoming()`, `getPopular()` 함수들을 만들 수 있습니다. 지금 작성할 코드 같은 경우에는 매우 크지 않기 때문에 `componentDidMount()` 안에 작성할 수 있습니다. 다른 함수들로 분리해서 바깥으로 빼고 `componentDidMount()` 안에서 `this.` 를 사용하여 호출할 수 있습니다.

### **src/Routes/Home/HomeContainer**

```javascript
(...)
export default class extends React.Component {
    state = {
        nowPlaying: null,
        upComing: null,
        popular: null,
        error: null,
        loading: true,
    };

    async componentDidMount() {
        try {
            const nowPlaying = await moviesApi.nowPlaying();
            // {data: {…}, status: 200, statusText: "", headers: {…}, config: {…}, …}
            console.log(nowPlaying);
        } catch {
            this.setState({
                error: "Can't find movies information",
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

`componentDidMount()` 안에 `try-catch`문을 작성합니다. 무언가를 `try`하고, 작동하지 않으면 `catch` 다른 처리를 해줄 것, 뭐가 발생하든 마지막 `finally`에는 loading 값을 `false`로 만들어주고 에러를 보여주거나, 무비리스트를 보여줍니다.

`catch`는 보통 error 메세지가 따라오지만 여기서는 메세지 작업 없이 `error` 상태값만 변경해줍니다.

여기서 문제는 자바스크립트는 `componentDidMount`를 실행하지 않고 `nowPlaying` 무비 가져오는 것을 시작합니다. API가 리턴될 때까지 기다리지 않습니다. 즉, `moviesApi.nowPlaying()`를 실행하고, 그 다음을 계속해서 실행합니다. 실행을 마친 이후 데이터를 기다리지 않는다는 건데요.

`try` 블록에서는 `async`, `await` 작업을 해줘야하는데, 그러려면 `componentDidMount`는 `wait`를 원하는`async`가 되어야합니다. `async`, `await`는 자바스크립트한테 내가 무언가를 끝낼 때까지 기다림을 요청하는 것입니다.

### **src/Routes/Home/HomeContainer**

```javascript
(...)
export default class extends React.Component {
    (...)
    async componentDidMount() {
        try {
            const nowPlaying = moviesApi.nowPlaying(); // await 제거
            // Promise() ~...
            console.log(nowPlaying);
        } catch {}
        (...)
    }
    (...)
}
(...)
```

위의 코드는 `await`를 생략했을 때 console 값으로 `Promise()`가 출력됩니다. 우리가 원하는 것은 props가 finished 될 때까지 기다리는 것인데요. `await`를 작성했을 땐 이 부분이 끝나고 출력한 결과가 나옵니다.

원하는 값은 `data` 안의 `data.results` 값입니다. 이는 객체 비구조화를 통해 값을 얻을 수 있습니다.

### **src/Routes/Home/HomeContainer**

```javascript
(...)
export default class extends React.Component {
    (...)
    async componentDidMount() {
        try {
            const {
                data: { results }, // 객체 비구조화
            } = await moviesApi.nowPlaying();
            console.log(results);
        } catch {}
        (...)
    }
    (...)
}
(...)
```

여기서 `results` 값을 `nowPlaying`로 바꿔줄 수 있습니다.

### **src/Routes/Home/HomeContainer**

```javascript
(...)
export default class extends React.Component {
    (...)
    async componentDidMount() {
        try {
            const {
                data: { results },
            } = await moviesApi.nowPlaying();
            console.log(results);
            this.setState({ // results 값을 nowPlaying으로 바꿔줌
                nowPlaying: results,
            });
        } catch {}
        (...)
    }
    (...)
}
(...)
```

`nowPlaying` 데이터만 가져오는 게 아니라 `upcoming`, `popular`도 가져와야 하므로 `results` 명은 문제가 될 수 있습니다. `results`를 `nowPlaying`으로 다시 명을 지정하겠습니다.

### **src/Routes/Home/HomeContainer**

```javascript
(...)
export default class extends React.Component {
    (...)
    async componentDidMount() {
        try {
            const {
                data: { results: nowPlaying }, // results를 nowPlaying으로 다시 지정
            } = await moviesApi.nowPlaying();
            console.log(nowPlaying);
        } catch {}
        (...)
    }
    (...)
}
(...)
```

위와 같이 upComing, popular 등도 작성해줍니다. 그리고 현재 상태값을 변경해줍니다.

### **src/Routes/Home/HomeContainer**

```javascript
(...)
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
(...)
```

## 5.3 TV Comtainer

TV Container도 Home Container와 같이 코드를 작성해줍니다.

### **src/Routes/TV/TVContainer**

```javascript
(...)
export default class extends React.Component {
    (...)
    async componentDidMount() {
        try {
            const {
                data: { results: topRated },
            } = await tvApi.topRated();

            const {
                data: { results: popular },
            } = await tvApi.popular();

            const {
                data: { results: airingToday },
            } = await tvApi.airingToday();

            this.setState({
                topRated,
                popular,
                airingToday,
            });
        } catch {
            this.setState({
                error: "Can't find TV information.",
            });
        } finally {
            this.setState({
                loading: false,
            });
        }
    }
    (...)
}
(...)
```

## 5.4 Search Container

Search Container는 모든 로직들을 가집니다.

첫 번째 로직은 handleSubmit으로, form에서 text를 입력하고 enter를 누르면 그것이 handleSubmit이 됩니다. handleSubmit은 searchTerm이 빈칸(공백)이 아닌 것을 체크하고, search 함수를 실행합니다.

handleSubmit을 작성해보겠습니다.

try에서 해줄 작업들은 : 누군가 검색했을 때 로딩을 true로 만들것임. 디폴트 로딩은 false. 타이핑하고 검색했을 때 로딩을 true로.

### **src/Routes/Search/SearchContainer**

```javascript
import React from 'react';
import SearchPresenter from './SearchPresenter';
import { moviesApi, tvApi } from 'API';

export default class extends React.Component {
    state = {
        movieResults: null,
        tvResults: null,
        searchTerm: '',
        loading: false, // 검색하고 엔터 누르면 true
        error: null,
    };

    handleSubmit = () => {
        const { searchTerm } = this.state;
        if (searchTerm !== '') {
            this.searchByTerm();
        }
    };

    searchByTerm = async () => {
        const { searchTerm } = this.state;
        try {
            const movieResults = await moviesApi.search(searchTerm);
            const showResults = await tvApi.search(searchTerm);

            console.log(movieResults, showResults);
            this.setState({
                loading: true,
            });
        } catch {
            this.setState({
                error: "Can't find results",
            });
        } finally {
            this.setState({
                loading: false,
            });
        }
    };

    render() {
        const {
            movieResults,
            tvResults,
            searchTerm,
            loading,
            error,
        } = this.state;

        return (
            <SearchPresenter
                movieResults={movieResults}
                tvResults={tvResults}
                searchTerm={searchTerm}
                loading={loading}
                error={error}
            />
        );
    }
}
```

위의 코드에서는 아무것도 검색하지 않아 `console.log(movieResults, tvResults);`을 입력하여도 값이 출력되지 않습니다. 값을 출력하기 위해 시뮬레이션으로 `searchTerm`에 "code"를 넣어준 후 `componentDidMount` 됐을 때 `handleSubmit`을 호출해보겠습니다.

### **src/Routes/Search/SearchContainer**

```javascript
(...)

export default class extends React.Component {
    state = {
        movieResults: null,
        tvResults: null,
        searchTerm: 'code', // 검색어 "code" 추가
        loading: false, // 검색하고 엔터 누르면 true
        error: null,
    };

    componentDidMount() { // componentDidMount 됐을 때 handleSubmit 호출
        this.handleSubmit();
    }

    (...)
}
```

위의 시뮬레이션으로 `handleSubmit`가 호출되고 이어서 `searchByTerm`도 호출되어 `movieResults`, `showResults`가 출력됩니다.

원하는 값을 얻으려면 `data.results.something` 으로 접근해야하므로 코드를 변경해줍니다.

로딩될 때 `movieResults`, `tvResults`를 가져오고, 그 다음 `setState`해줍니다.

### **src/Routes/Search/SearchContainer**

```javascript
(...)

export default class extends React.Component {
    (...)

    searchByTerm = async () => {
        const { searchTerm } = this.state;
        this.setState({
            loading: true,
        });
        try {
            const {
                data: { results: movieResults }, // 접근방식 변경
            } = await moviesApi.search(searchTerm);
            const {
                data: { results: tvResults }, // 접근방식 변경
            } = await tvApi.search(searchTerm);

            this.setState({ // setState 추가
                movieResults,
                tvResults,
            });
        } catch {
            this.setState({
                error: "Can't find results",
            });
        } finally {
            this.setState({
                loading: false,
            });
        }
    };
}
```

다시 돌아와서, 시뮬레이션으로 작성해 둔 `componentDidMount`를 삭제하고 `searchTerm` 값을 빈 값(공백"")으로 변경해줍니다.

이제, `input` 값으로 검색하고, 리턴 받을 때 작동하게끔 만들기 위해서는 `handleSubmit`을 함수로 `SearchPresenter`에 모두 보내야합니다.

### **src/Routes/Search/SearchContainer**

```javascript
(...)

export default class extends React.Component {
    (...)

    render() {
        const {
            movieResults,
            tvResults,
            searchTerm,
            loading,
            error,
        } = this.state;

        return (
            <SearchPresenter
                movieResults={movieResults}
                tvResults={tvResults}
                searchTerm={searchTerm}
                loading={loading}
                error={error}
                handleSubmit={this.handleSubmit} // handleSubmit 전달
            />
        );
    }
}
```

`handleSubmit`을 보낸 후 `SearchPresenter`에서 폼을 만들고, 셋업 한 후 `onSubmit`을 호출하도록 만들 것입니다. `handleSubmit`을 호출하기 위해서는 `handleSubmit`은 `searchByTerm`을 호출하고, `searchByTerm`에서 모든 작업을 준비해야합니다.

다음은 Detail 컴포넌트를 작업해야하는데요.

보이는 화면에는 아직 Detail Router을 사용하고 있지 않습니다. 사용자들이 '/movie/12' 로 이동할 수 있도록 만들기 위해서는 `ID`를 가지고 사용자들을 `movieDetail`로 이동할 수 있게끔 만들어야합니다.

URL에서 `ID`를 얻어 그 `ID`로 검색할 수 있도록 합니다. TV Router도 똑같습니다. 다른 점은 movie를 찾을지, TV를 찾을지 알아내야 한다는 것입니다.

movie와 tv를 위한 Router 각 하나씩 만들어주겠습니다.
컴포넌트의 router는 똑같지만 url은 다를 것입니다. 예를 들어, ID12를 가진 movie를 찾을 건지, ID12를 가진 TV를 찾을 건지 알아야합니다.

### **src/Components/Router.js**

```javascript
(...)
export default () => (
    <Router>
        <>
            <Header />
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/tv" component={TV} />
                <Route path="/search" component={Search} />
                <Route path="/movie/:id" component={Detail} /> // 추가
                <Route path="/tv/:id" component={Detail} /> // 추가
                <Redirect from="*" to="" />
            </Switch>
        </>
    </Router>
);
```

`<Route path="/movie/:id" component={Detail} />`에서 ':'가 의미하는 것은 `ID`이며, 'id:' 이 부분은 뭐로든 변경될 수 있습니다.

## 5.5 Detail Container part One

Header 컴포넌트는 `withRouter` 컴포넌트를 사용하여 Router 컴포넌트, Router 함수들을 가지고 작업하였으므로 각 라우터의 위치를 알고있습니다.  디폴트로 리액트 Router가 모든 정보를 Route들에게 주기 때문에 밑의 작업들을 Detail에 해줄 필요가 없습니다. 예를 들어, Header는 Route가 아니기 때문에 Router에서 Location 정보를 받을 수 없는 것과 같은데요.

하지만 Home, TV, Search, Detail. default로 Router는 모든 Route들에게 props를 줍니다. 밑에서 확인해보겠습니다.

### **src/Routes/Detail/DetailContainer**

```javascript
(...)
export default class extends React.Component {
    (...)

    render() {
        (...)

        console.log(this.props);

        (...)
    }
}
```

'localhost:3000/movie/1'으로 이동해서 확인해보면 '{history: {…}, location: {…}, match: {…}, staticContext: undefined}'와 같이 Detail이 있고, Header가 받은 props와 같은 값들을 가지고 있음을 알 수 있습니다.

이와 같은 경우, 아무것도 꾸며줄 필요가 없습니다. 디폴트로 Router가 정보를 Route들에게 주기 때문인데요.

첫 번째로 해야할 작업은 현재 경로가 '/movie'에 있는 지, '/show'에 있는지 알아야합니다. 이 둘은 같은 페이지, 같은 컴포넌트로 연결되어있습니다.

두 번째, 어떤 숫자가 뒤에 붙는지 알아봐야합니다. 아까 출력한 props를 확인해보면 props는 match를 가지고 있는데, match 안에는 params, id가 있습니다. 이를 통해 리액트 라우터가 각각 다른 장소에 파라미터를 전달한다는 것을 알 수 있습니다.

우선 다음과 같이 작성해보도록하겠습니다.

props를 가져와야하므로 match.params.id를 작성합니다.

### **src/Routes/Detail/DetailContainer**

```javascript
(...)

export default class extends React.Component {
    (...)

    async componentDidMount() {
        const {
            match: {
                params: { id },
            },
        } = this.props;

        console.log(this.props);
    }

    (...)
}
```

콘솔 결과로 id 값이 출력되는 것을 확인할 수 있습니다.

돌아와서 props의 출력값을 다시 확인해보면 history가 있는 것을 확인할 수 있으며, 이는 수정할 수 있습니다.

사용자가 id에 숫자가 아닌 값을 입력할 수 있으므로 id가 숫자인지 아닌지 판별할 수 있어야하는데요. api의 id 값은 숫자를 검색하기 때문에 string 요청을 하지 않아도 됩니다.(4:42)

`typeof id`를 출력해보겠습니다.

### **src/Routes/Detail/DetailContainer**

```javascript
(...)

export default class extends React.Component {
    (...)

    async componentDidMount() {
        const {
            match: {
                params: { id },
            },
        } = this.props;

        console.log(typeof id);
    }

    (...)
}
```

id를 숫자, 문자 어느 것으로 입력해도 `string`이 출력됩니다. id는 `string`이라는 것을 알 수 있는데요. 이때, `parseInt`, `Number`를 사용하면 string을 숫자로 변환해줍니다.
    - Number(str) : 문자열을 인자로 받으며 해당 문자열을 숫자로 바꿔줍니다. 숫자가 아닌 경우 NaN을 반환
    - parseInt(str) : `Number(str)`와 동일하게 문자열을 인자로 받으며 해당 문자열을 숫자로 바꿔줍니다. 숫자가 아닌 경우에 더해서 숫자로 시작하는 경우 숫자가 끝날 때 까지만 형변환을 하여 반환함. 시작이 숫자가 아니면 Number()와 마잔가지로 NaN을 반환.

### **src/Routes/Detail/DetailContainer**

```javascript
(...)

export default class extends React.Component {
    (...)

    async componentDidMount() {
        const {
            match: {
                params: { id },
            },
            history: { push }, // 추가
        } = this.props;

        const parsedId = parseInt(id);

        if (isNaN(parsedId)) {
            return push('/');
        }
    }

    (...)
}
```

parsedId가 number가 아니면, props에서 historu.push를 가져옵니다. 이때 라우터에 새 URL을 푸시하기 위해 `push('/')`를 작성합니다. 이렇게 코드를 작성하고 나면 숫자가 아닐 때 `home('/')` 으로 돌아갑니다.

## 5.6 Detail Container part Two

이어서 `this.props`를 출력하여 `location.pathname`을 가져와야합니다.

### **src/Routes/Detail/DetailContainer**

```javascript
(...)

export default class extends React.Component {
    (...)

    async componentDidMount() {
        const {
            match: {
                params: { id },
            },
            history: { push },
            location: { pathname }, // 추가
        } = this.props;

        const parsedId = parseInt(id);

        if (isNaN(parsedId)) {
            return push('/');
        }
    }

    (...)
}
```

콘솔창에 테스트를 해봅니다.

```javascript
const path = "/movie/234";
path.includes("/movie/")
// true
```

pathname을 알고있으니 가져와서 아래와 같이 전체 클래스로 작성해줍니다.

### **src/Routes/Detail/DetailContainer**

```javascript
(...)

export default class extends React.Component {
    (...)

    async componentDidMount() {
        const {
            match: {
                params: { id },
            },
            history: { push },
            location: { pathname },
        } = this.props;

        this.isMovie = pathname.includes('/movie/'); // 전체 class에 저장

        const parsedId = parseInt(id);

        if (isNaN(parsedId)) {
            return push('/');
        }
    }

    (...)
}
```

search를 작업하기 이전에 `state`를 `consrtuctor`(생성자)를 사용하여 변경해보도록하겠습니다.

### **src/Routes/Detail/DetailContainer**

```javascript
(...)

export default class extends React.Component {
    // state를 constructor로 변경
    constructor(props) {
        super(props); //여기서 props는 { pathname }이 아님. { pathname } 존재하지 않음. 생성자 클래스
        const {
            location: { pathname },
        } = props;
        this.state = { // 변경
            // 클래스가 생성됨
            result: null,
            error: null,
            loading: true,
            isMovie: pathname.includes('/movie/'), //  변경
        };
    }

    async componentDidMount() {
        const {
            match: {
                params: { id },
            },
            history: { push },
        } = this.props;

        const parsedId = Number(id);

        if (isNaN(parsedId)) {
            return push('/');
        }
    }

    (...)
}
```

다음은 movie를 찾습니다.

```javascript
(...)

export default class extends React.Component {
    // state를 constructor로 변경
    constructor(props) {
        super(props); //여기서 props는 { pathname }이 아님. { pathname } 존재하지 않음. 생성자 클래스
        const {
            location: { pathname },
        } = props;
        this.state = { // 변경
            // 클래스가 생성됨
            result: null,
            error: null,
            loading: true,
            isMovie: pathname.includes('/movie/'), //  변경
        };
    }

    async componentDidMount() {
        const {
            match: {
                params: { id },
            },
            history: { push },
        } = this.props;

        const { isMovie } = this.state;
        const parsedId = Number(id);

        if (isNaN(parsedId)) {
            return push('/');
        }

        let result = null;

        try {
            if (isMovie) {
                ({ data: result } = await moviesApi.movieDetail(parsedId)); // 변경
            } else {
                // const request = await tvApi.tvDetail(parsedId);
                // result = request.data;
                ({ data: result } = await tvApi.tvDetail(parsedId)); // 변경
            }
            console.log(result);
        } catch {
            this.setState({ error: "Can't find anything" });
        } finally {
            this.setState({ loading: false });
        }
    }

    (...)
}
```

`({ data: result } = await moviesApi.movieDetail(parsedId));`는 객체비구조화할당문법을 사용했습니다. `({a, b} = {a: 1, b: 2})`는 `const {a, b} = {a: 1, b: 2}`와 같습니다.

```javascript
var a, b;

({a, b} = {a: 1, b: 2});
```

할당 문을 둘러싼 ( .. )는 선언 없이 객체 리터럴(object literal) 비구조화 할당을 사용할 때 필요한 구문입니다.

{a, b} = {a:1, b:2}는 유효한 독립 구문이 아닙니다. 좌변의 {a, b}이 객체 리터럴이 아닌 블록으로 간주되기 때문입니다.

하지만, ({a, b} = {a:1, b:2})는 유효한데, var {a, b} = {a:1, b:2}와 같습니다. ( .. ) 표현식 앞에는 세미콜론이 있어야 합니다. 그렇지 않을 경우 이전 줄과 연결되어 함수를 실행하는데 이용될 수 있습니다.