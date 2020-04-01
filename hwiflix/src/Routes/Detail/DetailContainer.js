import React from 'react';
import DetailPresenter from './DetailPresenter';

export default class extends React.Component {
    state = {
        result: null,
        // 기본적으로 show를 찾을 때 ID를 갖고감. 그 작업들이 끝나면 ID를 가져와 그걸로 검색하고 결과값(result)를 보여줌.
        // result가 tv든 movie든 똑같은 거임. 같은 result, 같은 라우터 detail를 사용함.
        error: null,
        loading: true,
    };

    // 여기에 모든 로직 추가 (api 가져오기, error 처리, DetailPresenter로 바로 가는 state값을 렌더링)

    render() {
        const { result, error, loading } = this.state;

        return (
            <DetailPresenter result={result} error={error} loading={loading} />
        );
    }
}
