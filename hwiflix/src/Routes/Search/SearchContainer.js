import React from 'react';
import SearchPresenter from './SearchPresenter';
import { moviesApi, tvApi } from 'API';

export default class extends React.Component {
    state = {
        movieResults: null,
        tvResults: null,
        searchTerm: '',
        loading: false, // 검색하고 엔터 누르면 true
        error: null,
    };

    handleSubmit = (event) => {
        if (event) {
            event.preventDefault();
        }

        const { searchTerm } = this.state;
        if (searchTerm !== '') {
            this.searchByTerm();
        }
    };

    updateTerm = (event) => {
        const {
            target: { value },
        } = event;

        console.log(value);

        this.setState({
            searchTerm: value,
        });
    };

    searchByTerm = async () => {
        const { searchTerm } = this.state;
        this.setState({
            loading: true,
        });
        try {
            const {
                data: { results: movieResults },
            } = await moviesApi.search(searchTerm);
            const {
                data: { results: tvResults },
            } = await tvApi.search(searchTerm);

            this.setState({
                movieResults,
                tvResults,
            });
        } catch {
            this.setState({
                error: "Can't find results",
            });
        } finally {
            this.setState({
                loading: false,
            });
        }
    };

    render() {
        const {
            movieResults,
            tvResults,
            loading,
            searchTerm,
            error,
        } = this.state;

        return (
            <SearchPresenter
                movieResults={movieResults}
                tvResults={tvResults}
                loading={loading}
                searchTerm={searchTerm}
                error={error}
                handleSubmit={this.handleSubmit}
                updateTerm={this.updateTerm}
            />
        );
    }
}
