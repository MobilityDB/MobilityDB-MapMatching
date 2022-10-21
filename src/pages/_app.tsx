import '@/styles/bundle.css'
import type { AppProps } from 'next/app'
import MatcherProvider from '@/context/matcherContext'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MatcherProvider>
      <Component {...pageProps} />
    </MatcherProvider>
  )
}
export default MyApp
