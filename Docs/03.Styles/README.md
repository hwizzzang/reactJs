# 3. Styles

## 3.2 CSS in React part Three

javaScript를 사용하여 CSS를 작성할 수 있습니다.

먼저 styled components를 설치해줍니다.

```bash
$ yarn add styled-components
```

Header 컴포넌트에서 styled components를 사용해보겠습니다. javaScript 안에 CSS가 있고 컴포넌트를 바꾸면 됩니다.

```javascript
import React from 'react';
import styled from 'styled-components';

const Header = styled.header``;

const List = styled.ul`
    display: flex;

    &:hover {
        background: blue;
    }
`;

const Item = styled.li``;

export default () => (
    <Header>
        <List>
            <Item>
                <a href="/">Movies</a>
            </Item>
            <Item>
                <a href="/tv">TV</a>
            </Item>
            <Item>
                <a href="/search">Search</a>
            </Item>
        </List>
    </Header>
);
```

`a` tag의 `href`는 `react-router-dom`의 `Link`를 사용하여 변경할 수 있습니다.

```javascript
import React from 'react';
import { Link } from "react-router-dom";
import styled from 'styled-components';

const Header = styled.header``;

const List = styled.ul`
    display: flex;

    &:hover {
        background: blue;
    }
`;

const Item = styled.li``;

const SLink = styled(Link)``;

export default () => (
    <Header>
        <List>
            <Item>
                <Link to="/">Movies</Link>
            </Item>
            <Item>
                <Link to="/tv">TV</Link>
            </Item>
            <Item>
                <Link to="/search">Search</Link>
            </Item>
        </List>
    </Header>
);
```

`const SLink = styled(Link)``;`처럼 `Link`에 스타일을 추가할 수 있고 `Link`로 사용할 수 있으며, React Router에는 `href`가 존재하지 않아 `Link` 사용 시 `to`로 변경하여 사용할 수 있습니다.

여기서, `Router`는 오직 하나의 Child만 render 하기 때문에 `Link`를 `Router` 밖에서 사용하면 안 됩니다. Router 컴포넌트에서 Header 컴포넌트를 불러와줍니다.

### **src/Components/Router**

```javascript
...
import Header from 'Components/Header'; // 추가
.
.
.
export default () => (
    <Router>
        <Header /> // 추가
        <Switch>
            .
            .
            .
        </Switch>
    </Router>
);
```

## 3.3 GlobalStyles and Header

Global Style을 작성하기 위해서는 styled-reset을 설치해야합니다.

```bash
$ yarn add styled-reset
```

GlobalStyles.js 파일도 생성하고 App 컴포넌트에서 import합니다.

### **src/Components/GlobalStyles.js**

```javascript
import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';


const GlobalStyles = createGlobalStyle`
    ${reset};
    .
    .
    .
`

export default GlobalStyles;
```

### **src/Components/GlobalStyles.js**

```javascript
import React from 'react';
import Router from 'Components/Router';
import GlobalStyles from 'Components/GlobalStyles'; // 추가

function App() {
    return (
        <>
            <Router />
            <GlobalStyles /> // 추가
        </>
    );
}

export default App;
```

## 3.4 Location Aware Header

다음은 Header가 어느 Route에 있는지 알 수 있도록 만들어보겠습니다.

우선 `header`의 Item에 props를 넣은 후 props 값에 따라 스타일을 변경해줍니다.

### **src/Components/Header.js**

```javascript
.
.
.
const Item = styled.li`
    width: 50px;
    height: 50px;
    text-align: center;
    border-bottom: 5px solid
        ${(props) => (props.current ? '#3498db' : 'transparent')};
`;

export default () => (
    <Header>
        <List>
            <Item current={false}>
                <SLink to="/">Movies</SLink>
            </Item>
            <Item current={true}>
                <SLink to="/tv">TV</SLink>
            </Item>
            <Item current={false}>
                <SLink to="/search">Search</SLink>
            </Item>
        </List>
    </Header>
);
```

위 코드에서는 `props`의 값에 따라 색상을 변경해주었습니다. 어느 Route에 있는 지에 따라 색상을 변경하기 위해서는 `withRouter`를 사용해야합니다.

### **src/Components/Header.js**

```javascript
import { Link, withRouter } from 'react-router-dom';
.
.
.
export default withRouter((props) => (
    <Header>
        <List>
            <Item current={false}>
                <SLink to="/">Movies</SLink>
            </Item>
            <Item current={true}>
                <SLink to="/tv">TV</SLink>
            </Item>
            <Item current={false}>
                <SLink to="/search">Search</SLink>
            </Item>
        </List>
    </Header>
));
```

`withRouter`는 다른 컴포넌트를 감싸는 컴포넌트로, Router에 어떠한 정보를 줍니다.

위의 코드는 다음과 같이 변경할 수 있습니다.

### **src/Components/Header.js**

```javascript
.
.
.
const HeaderC = (props) => (
    <Header>
        {console.log(props)}
        <List>
            <Item current={false}>
                <SLink to="/">Movies</SLink>
            </Item>
            <Item current={true}>
                <SLink to="/tv">TV</SLink>
            </Item>
            <Item current={false}>
                <SLink to="/search">Search</SLink>
            </Item>
        </List>
    </Header>
);

export default withRouter(HeaderC);
```

`withRouter` 가 Header 컴포넌트를 감싼 형태이기 때문에 Header 컴포넌트는 `props`를 가질 수 있으며, `withRouter`를 사용하면서 어떤 컴포넌트와도 연결할 수 있습니다.

console.log 값을 살펴보면 Router에 있는 `history`, `location`, `match`를 확인할 수 있습니다.

다시 이전 코드로 돌아가겠습니다.

여기서 원하는 것은 `history`인데요. tv 링크를 클릭했을 때 `location`의 `pathname` 값이 '/tv'가 된 것을 확인할 수 있습니다. 따라서 `props.location.pathname` 값을 얻어오면 됩니다.