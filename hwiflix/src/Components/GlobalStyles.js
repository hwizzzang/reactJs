import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyles = createGlobalStyle`
    ${reset};
    
    html {
        height: 100%;
        line-height: 1.15;
        font-size: 62.5%; // now 10px = 1rem
    }

    body {
        height: 100%;
        margin: 0;
        padding: 0;
        font-size: 1.4rem;
    }

    /* 해당 스타일 추가*/
    body {
        background-color: rgba(20, 20, 20, 1);
        color:white;
        padding-top: 8rem;
    }

    h1 {
        margin: 0;
        font-size: 2em;
    }

    p {
        margin: 0;
    }

    hr {
        height: 0;
        box-sizing: content-box;
        overflow: visible;
    }

    pre {
        font-family: monospace, monospace;
        font-size: 1em;
    }

    a {
        background-color: transparent;
        color: inherit;
        text-decoration: none;
    }

    abbr[title] {
        border-bottom: none;
        text-decoration: underline;
        text-decoration: underline dotted;
    }

    b,
    strong {
        font-weight: bold;
    }

    canvas {
        display: block;
    }

    code,
    kbd,
    samp {
        font-family: monospace, monospace;
        font-size: 1em;
    }

    small {
        font-size: 80%;
    }

    sub,
    sup {
        position: relative;
        vertical-align: baseline;
        line-height: 0;
        font-size: 75%;
    }

    sub {
        bottom: -0.25em;
    }

    sup {
        top: -0.5em;
    }

    img {
        border-style: none;
    }

    button {
        background-color: transparent;
    }

    button,
    input,
    optgroup,
    select,
    textarea {
        margin: 0;
        font-family: inherit;
        line-height: 1.15;
        font-size: 100%;
    }

    button,
    input {
        overflow: visible;
    }

    button,
    select {
        text-transform: none;
    }

    button,
    input,
    select,
    label {
        //-moz-appearance: none;
        -moz-border-radius: 0;
        -moz-box-sizing: border-box;
        //-webkit-appearance: none;
        -webkit-border-radius: 0;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        //appearance: none;
        border-radius: 0;
    }

    select::-ms-expand {
        display: none;
    }

    select {
        -moz-appearance: none;
        -moz-border-radius: 0;
        -moz-box-sizing: border-box;
        -webkit-appearance: none;
        -webkit-border-radius: 0;
        -webkit-box-sizing: border-box;
        appearance: none;
        border-radius: 0.5rem;
        box-sizing: border-box;
        background-size: 1rem 0.5491rem;
        background-position: 91% 50%;
    }

    button {
        border: 0;
        outline: 0;
        cursor: pointer;
        -moz-appearance: none;
    }

    input[type=tel],
    input[type=text] {

        &::-ms-clear {
            display: none;
        }
    }

    // fieldset {
    //     padding: 0.35em 0.75em 0.625em;
    // }

    legend {
        display: table;
        max-width: 100%;
        box-sizing: border-box;
        padding: 0;
        color: inherit;
        white-space: normal;
    }

    progress {
        vertical-align: baseline;
    }

    textarea {
        overflow: auto;
    }

    //[type="checkbox"],
    //[type="radio"] {
        //-webkit-appearance: none;
        //-webkit-border-radius: 0;
        //-webkit-box-sizing: border-box;
        //box-sizing: border-box;
        //padding: 0;
    //}

    [type="search"] {
        outline-offset: -0.2rem;

        &::-webkit-search-cancel-button {
            display: none;
        }
    }

    details {
        display: block;
    }

    summary {
        display: list-item;
    }

    template {
        display: none;
    }

    [hidden] {
        display: none;
    }

    dl,
    ul {
        margin: 0;
        padding: 0;
    }

    ul {

        li {
            list-style: none;
        }
    }

    dd {
        margin: 0;
    }

    dd,
    div,
    dl,
    dt,
    footer,
    h1,
    header,
    li,
    p {
        box-sizing: border-box;
    }

    h1 {
        line-height: 1.2;
    }

    h2, h3, h4, h5 {
        line-height: 1.3;
        margin: 0;
    }

    p, small {
        line-height: 1.5;
    }

    table {
        border: none;
        border-spacing: 0;
        -webkit-border-horizontal-spacing: 0;
        -webkit-border-vertical-spacing: 0;
    }
`;

export default GlobalStyles;
