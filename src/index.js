import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {CookiesProvider} from "react-cookie";

//SBAdmin2 Style
import './styles/scss/sb-admin-2.scss';

import 'bootstrap/dist/js/bootstrap.bundle.min';


//Redux
import {Provider} from 'react-redux';
import Store from './redux/store';

ReactDOM.render(
    <CookiesProvider>
        <Provider store={Store}>
            <App/>
        </Provider>
    </CookiesProvider>,
    document.getElementById('root')
);
