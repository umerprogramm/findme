import { Provider } from 'react-redux'
import '../styles/globals.css'
import { Store } from '../store/Store'

export default function App({ Component, pageProps }) {
  return( 
  <>
  <Provider store={Store}>
  <Component {...pageProps} />
  </Provider>
  </>
  )
}
