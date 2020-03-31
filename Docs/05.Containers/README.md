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