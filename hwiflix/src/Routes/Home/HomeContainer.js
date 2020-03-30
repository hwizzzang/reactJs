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
