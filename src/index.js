import 'lazysizes';
import 'utils/i18n';
import 'utils/highlight';
import 'intersection-observer';
import 'simplebar/src/simplebar.css';
// import 'mapbox-gl/dist/mapbox-gl.css';
import 'slick-carousel/slick/slick.css';
import 'react-image-lightbox/style.css';
import 'react-quill/dist/quill.snow.css';
import 'slick-carousel/slick/slick-theme.css';
import 'lazysizes/plugins/attrchange/ls.attrchange';
import 'lazysizes/plugins/object-fit/ls.object-fit';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import App from './App';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import React, { Suspense } from 'react';
import * as serviceWorker from './serviceWorker';
import { store, persistor } from './redux/store';
import LoadingScreen from './components/LoadingScreen';
import { PersistGate } from 'redux-persist/lib/integration/react';
import ContextWrapper from 'context/ContextWrapper';
// ----------------------------------------------------------------------

ReactDOM.render(
  <Suspense fallback={<LoadingScreen />}>
    <ContextWrapper>
      <Provider store={store}>
        <PersistGate loading={<LoadingScreen />} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    </ContextWrapper>
  </Suspense>,
  document.getElementById('root')
);
serviceWorker.unregister();
