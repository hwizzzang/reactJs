# 4. Networking

## 4.1 Sexy Networking with Axios Instances

다음은 list를 만들어보겠습니다.

라우터에서 호출, fetch하고 나머지 작업들을 진행할 건데 URL의 앞 부분이 같기 때문에 이 방법은 효율적이지 않습니다. URL의 API key, language가 모두 같습니다.

src/API.js 파일을 새로 생성해주는데, 이 파일은 오직 네트워킹과 API만 다룹니다.

### **src/API.js**

```javascript
import axios from 'axios';
```

API.js 파일을 가지고 작업하기 위해서 Axios를 설치해야합니다.

```bash
$ yarn add Axios
```

Axios의 장점은 Axios의 인스턴스를 설정(configure)할 수 있다는 것입니다. baseURL, headers, timeout와 같은 것들은 여러곳에서 반복해서 작성할 필요가 없습니다.

URL의 API key, language가 같으므로 쿼리 파라미터를 사용하여 코드를 추가해주고 URL을 가져와 API를 테스트 해보겠습니다.

### **src/API.js**

```javascript
import axios from 'axios';

// instance 설정
const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
    params: {
        api_key: '74bbea107aee977bd9deadbadcf7c3be',
        laguage: 'en-US',
    },
});

api.get("tv/popular"); // get("이 부분은 string!!")

export default api;
```

`api.get()`에서 경로를 '/tv/popular'로 작성하게 되면 `baseURL`을 덮어쓰게됩니다. '/'로 시작하는 것은 절대경로를 의미하는데, 여기서는 상대경로 'tv/popular'를 써야합니다.

+ Axios 최신 버전에서 401 Error.
    ```bash
    $ npm uninstall axios
    $ npm install axios@0.18.0
    ```

위의 코드를 테스트해보기 위해 api를 export하고 index.js 에서 import 한 후, 개발자 도구에서 network를 확인해보면 api를 확인할 수 있습니다.

## 4.2 API Verbs part One, Two

API.js 파일에서 2개의 오브젝트를 생성하겠습니다.

### **src/API.js**

```javascript
import axios from 'axios';

// instance 설정
const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/',
    params: {
        api_key: '74bbea107aee977bd9deadbadcf7c3be',
        laguage: 'en-US',
    },
});

export const moviesApi = {
    nowPlaying: () => api.get('movie/now_playing'),
    upComing: () => api.get('movie/upComing'),
    popular: () => api.get('movie/popular'),
    movieDetail: () =>
        api.get(`movie/${id}`, {
            params: {
                append_to_responsive: 'videos',
            },
        }),
    search: (term) =>
        api.get('search/movie', {
            query: encodeURIComponent(term),
        }),
};

export const tvApi = {
    toRated: () => api.get('tv/to_rated'),
    popular: () => api.get('tv/popular'),
    upComing: () => api.get('tv/airing_today'),
    tvDetail: () =>
        api.get(`tv/${id}`, {
            params: {
                append_to_responsive: 'videos',
            },
        }),
    search: (term) =>
        api.get('search/tv', {
            query: encodeURIComponent(term),
        }),
};
```