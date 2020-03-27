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