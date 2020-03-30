import React from 'react';
import SearchPresenter from './SearchPresenter';

export default class extends React.Component {
    state = {
        movieResults: null,
        tvResults: null,
        searchTerm: '',
        loading: false, // 검색하고 엔터 누르면 true
        error: null,
    };

    render() {
        const {
            movieResults,
            tvResults,
            searchTerm,
            loading,
            error,
        } = this.state;

        return (
            <SearchPresenter
                movieResults={movieResults}
                tvResults={tvResults}
                searchTerm={searchTerm}
                loading={loading}
                error={error}
            />
        );
    }
}
