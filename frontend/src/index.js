import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './_redux/store';
import { Toaster } from 'react-hot-toast';

const root = createRoot(document.getElementById('root'));
root.render(
	<Provider store={store}>
		<BrowserRouter>
			<App />
			<Toaster />
		</BrowserRouter>
	</Provider>,
);
