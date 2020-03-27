# 2. Project Setup

## 2.0 Setting Up the Project

yarn이나 npm을 이용하여 `create-react-app`을 설치할 수 있습니다.

```bash
$ yarn global add create-react-app
$ create-react-app project-name
```

위와 같이 설치할 수 있지만 `create-react-app`는 모듈 같은 것으로 자주 사용하지 않습니다. 그러나 사용할 때는 업데이트 되어 있기를 원합니다. 그래서 `create-react-app`을 실행하기 전 업데이트를 하고 실행을 해야하는데 이 방식은 좋지 않은 방식입니다. 이 문제에 대한 해결책으로는 `npx`가 있습니다.

`npx`는 `npm`처럼 `create-react-app` 같은 모듈을 사용할 수 있게 하는 작은 모듈입니다. 이를 컴퓨터에 저장해 놓을 필요는 없는데요. 다음과 같이 설치하면 됩니다.

```bash
$ yarn global add npx
$ npm i npx -g
$ npx create-react-app project-name
```

이렇게 하면 `create-react-app`을 `npx`로 실행할 수 있습니다. 여기서 `npx`는 최신 버전의 `create-react-app`을 다운 받은 후 실행하며, 끝난 후에 컴퓨터에서 삭제합니다. 오래된 `create-react-app`을 컴퓨터에 저장하고 있는 것보다 낫습니다.

다음은 `index.js`, `App.js`을 제외한 필요 없는 파일을 정리해주고 `.env` 파일을 src 폴더 바깥에 생성해줍니다.

### **App.js**

```javascript
import React from 'react';

function App() {
    return <div className="App" />;
}

export default App;
```

### **index.js**

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root'),
);

```

### **.env**

```env
NODE_PATH=src
```

---

## 2.1 React Router Part One

`App.js` 파일을 `src/Components`에 넣어준 후 `index.js` 파일에서 `App.js`의 경로를 변경해줍니다.

### **src/Components/App.js**

```javascript
import App from 'Components/App';
```

`./src/` 를 생략해도 `Components/App`가 작동하는 이유는 앞서 생성한 `.env` 에서 기본적으로 src 폴더를 바라보게끔 하기 때문입니다.

다음은 다른 스크린을 만들기 위해 `src` 폴더 안에 `Route` 폴더를 생성해준 후, 각 스크린에서 보여줄 페이지 `Home.js`, `Search.js`, `TV.js`, `Detail.js` 파일을 만들어줍니다.

### **src/Routes/Home,Search,TV,Detail.js**

```javascript
// 각 js 파일 상단에 입력
export default () => 'Home';
export default () => 'Search';
export default () => 'TV';
export default () => 'Detail';
```

각 뷰 페이지를 보여주기 위해서는 Router 패키지를 설치해야합니다.

```bash
$ yarn add react-router-dom
```

이후 Router 컴포넌트를 새로 만들어줍니다.

### **src/Components/Router.js**

```javascript
import React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import Home from 'Routes/Home';
import Detail from 'Routes/Detail';
import TV from 'Routes/TV';
import Search from 'Routes/Search';

export default () => {
    <Router>
        <Route path="/" exact component={Home} />
        <Route path="/TV" exact component={TV} />
        <Route path="/search" exact component={Search} />
        <Route path="/detail" exact component={Detail} />
    </Router>;
};
```

- `path` : 어느 URL에서 해당 Route를 render할 지 알려줍니다
- `exact` : 정확히 해당 path여야 한다는 것을 알려줍니다.
- `component={}` : 해당 Route에 왔을 때 어떤 컴포넌트를 보여줄 것인지 작성합니다.

Router 컴포넌트를 `App.js`에서 불러와 보여주겠습니다

### **src/Components/App.js**

```javascript
import React from 'react';
import Router from 'Components/Router';

function App() {
    return (
        <>
            <Router />
        </>
    );
}

export default App;
```

---

## 2.2 React Router part Two

URL을 살펴보면 `http://localhost:3001/#/`에서 맨 뒤에 `#/`가 붙는 게 보입니다. 이는 바로 Hash Router의 일부입니다. 미관상으로 좋아보이지 않으니 삭제할 건데요.

Router 컴포넌트에서 코드를 변경해보겠습니다.

### **src/Components/Router.js**

```javascript
.
.
import { BrowserRouter as Router, Route } from 'react-router-dom';
.
.
.
export default () => (
    <Router>
        <Route path="/" exact component={Home} />
        <Route path="/TV" component={TV} />
        <Route path="/search" component={Search} />
        <Route path="/detail" component={Detail} />
    </Router>
);

```

- `BrowserRouter` : HTML history API를 사용함.
- `HashRouter` : 해당 페이지의 Hash를 사용함.

상단에서 `BrowserRouter`로 변경 후, React Router의 `Composition`을 사용하기 위해 Home Route를 제외한 나머지 Route의 `exact`를 지워줍니다. 여기서 `BrowserRouter`는 해쉬태그 없이 일반적인 페이지처럼 동작하게끔 만들어줍니다.

`Composition`은 두 개 이상의 Route를 동시에 렌더링하는 방식입니다.

예를 들어, TV라는 Router 안에 popular라는 tab이 있다고 생각해봅시다. '/tv/popular'로 이동 시 `<Route path="/TV/popular" component={~~} />`와 같이 코드를 작성할 수 있는데요. 여기서 `components={}`를 쓰는 대신 `render`를 사용할 수 있습니다. 이 부분은 Function이 됩니다.

```javascript
<Router>
    <Route path="/TV" component={TV} />
    <Route path="/TV/popular" render={() => <h1>popular</h1>)} />
</Router>
```

'/tv/popular'로 이동해 보면 두 Route 모두 path에 일치하기 때문에 Component 모두 Render 되었습니다. '/tv'에도 일치하고, '/tv/popular'에도 일치합니다. 많은 페이지를 Render 해야할 때 Composition을 이용할 수 있습니다.

이어서 Header 컴포넌트를 생성해보겠습니다.

### **src/Components/Header.js**

```javascript
import React from 'react';

export default () => (
    <header>
        <ul>
            <li>
                <a href="/">Movies</a>
            </li>
            <li>
                <a href="/tv">TV</a>
            </li>
            <li>
                <a href="/search">Search</a>
            </li>
        </ul>
    </header>
);
```

Header 컴포넌트를 App 컴포넌트에 연결해줍니다.

```javascript
import React from 'react';
import Router from 'Components/Router';
import Header from 'Components/Header';

function App() {
    return (
        <>
            <Header />
            <Router />
        </>
    );
}

export default App;
```

Header 컴포넌트가 Router 밖에 있기 때문에 모든 페이지에서 Header가 나타나게됩니다. 그리고 URL을 바꾸면 Router는 자동적으로 새 Route를 Render합니다.

다음에는 Router 컴포넌트로 돌아가 Redirect을 해보겠습니다.

### **src/Components/Router.js**

```javascript
import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'; // Redirect 추가
import Home from 'Routes/Home';
import Detail from 'Routes/Detail';
import TV from 'Routes/TV';
import Search from 'Routes/Search';

export default () => (
    <Router>
        <Route path="/" exact component={Home} />
        <Route path="/tv" component={TV} />
        <Route path="/tv/popular" render={() => <h1>popular</h1>)} />
        <Route path="/search" component={Search} />
        <Route path="/detail" component={Detail} />
        <Redirect from="*" to="" /> // 추가
    </Router>
);
```

`<Redirect from="*" to="" />`를 살펴보자면, 웹사이트에서 어느 페이지를 가든 `exact`을 작성한 페이지를 살펴봅니다. 만약 '/search' 페이지로 이동을 한다면 '/' 에서는 false일 것입니다.

`<Redirect from="*" to="" />`는 일치하는 Route가 없다면 어느 페이지든 받아서 '/'로 보내줍니다.

여기서 어느 링크를 눌러도 Home으로 Redirect가 됩니다. '/'에 해당하는 Route를 Render하고, Redirect에 해당하는 것도 Render합니다. 이는 '/tv/popular'에서 두 개의 Route를 Render하는 것처럼, URL의 앞 부분이 같기 때문입니다.

이 부분을 고치기 위해서는 `Switch`라는 것을 사용해야합니다. `Switch`는 한 번에 오직 하나의 Route만 Render합니다.

### **src/Components/Router.js**

```javascript
.
.
import {
    BrowserRouter as Router,
    Route,
    Redirect,
    Switch, // 추가
} from 'react-router-dom';
.
.
.
export default () => (
    <Router>
        <Switch> // 추가
            <Route path="/" exact component={Home} />
            <Route path="/tv" exact component={TV} />
            <Route path="/tv/popular" render={() => <h1>popular</h1>)} />
            <Route path="/search" component={Search} />
            <Route path="/detail" component={Detail} />
            <Redirect from="*" to="" />
        </Switch>
    </Router>
);
```

'/tv/popular'로 이동 시 `<h1>popular</h1>`는 Render 되지 않고 있는데요. tv Route에 `exact`를 추가해주면 '/tv/popular'으로 이동 시 popular가 보이게 됩니다.

### **src/Components/Router.js**

```javascript
<Route path="/tv" exact component={TV} />
```