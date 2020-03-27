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