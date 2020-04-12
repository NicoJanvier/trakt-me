import { AppProps } from 'next/app'
import { ThemeProvider } from 'styled-components'
import { SWRConfig } from 'swr';
import { AuthProvider } from '../context/AuthContext'
import myFetch from '../utils/fetch';

const theme = {
  colors: {
    primary: '#0070f3',
  }
};

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <SWRConfig value={{ fetcher: myFetch }}>
        <AuthProvider>
          <Component {...pageProps} />
        </AuthProvider>
      </SWRConfig>
    </ThemeProvider>
  )
}

export default MyApp