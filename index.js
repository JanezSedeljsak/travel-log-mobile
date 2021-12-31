import { registerRootComponent } from 'expo';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './src/redux'
import thunk from 'redux-thunk';
import App from './src/App';

const store = createStore(rootReducer, applyMiddleware(thunk))

function WrapperComponent() {
    return (
        <Provider store={store}>
            <App />
        </Provider>
    )
}

registerRootComponent(WrapperComponent);
