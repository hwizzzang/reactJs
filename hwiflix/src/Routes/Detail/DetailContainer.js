import React from 'react';
import DetailPresenter from './DetailPresenter';
import { moviesApi } from '../../API';
import { tvApi } from '../../API';

export default class extends React.Component {
    constructor(props) {
        super(props); //여기서 props는 { pathname }이 아님. { pathname } 존재하지 않음. 생성자 클래스
        const {
            location: { pathname },
        } = props;
        this.state = {
            // 클래스가 생성됨
            result: null,
            error: null,
            loading: true,
            isMovie: pathname.includes('/movie/'),
        };
    }
    // state = {
    //     result: null,
    //     // 기본적으로 show를 찾을 때 ID를 갖고감. 그 작업들이 끝나면 ID를 가져와 그걸로 검색하고 결과값(result)를 보여줌.
    //     // result가 tv든 movie든 똑같은 거임. 같은 result, 같은 라우터 detail를 사용함.
    //     error: null,
    //     loading: true,
    // };

    // 여기에 모든 로직 추가 (api 가져오기, error 처리, DetailPresenter로 바로 가는 state값을 렌더링)

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
                ({ data: result } = await moviesApi.movieDetail(parsedId));
            } else {
                // const request = await tvApi.tvDetail(parsedId);
                // result = request.data;
                ({ data: result } = await tvApi.tvDetail(parsedId));
            }
            console.log(result);
        } catch {
            this.setState({ error: "Can't find anything" });
        } finally {
            this.setState({ loading: false });
        }
    }

    render() {
        const { result, error, loading } = this.state;

        return (
            <DetailPresenter result={result} error={error} loading={loading} />
        );
    }
}
// 코드는 다 입력했음. 정리는 9:35부터 작성
