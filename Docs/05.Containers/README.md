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