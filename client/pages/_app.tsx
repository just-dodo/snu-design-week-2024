import React from 'react'
import { AppProps } from 'next/app'
import 'tailwindcss/tailwind.css'
import { StyledThemeProvider } from '@definitions/styled-components'
import { appWithTranslation } from '@i18n'
import GlobalStyle from 'src/styles/globalStyles'
import type { ReactElement, ReactNode } from 'react'
import type { NextPage } from 'next'
import Layout from 'components/layout'
import Head from 'next/head'
import { Analytics } from '@vercel/analytics/react';


// used for rendering equations (optional)
import 'katex/dist/katex.min.css'
// used for code syntax highlighting (optional)
import 'prismjs/themes/prism-coy.css'
// core styles shared by all of react-notion-x (required)
import 'react-notion-x/src/styles.css'
import "@/styles/global.css";
// this might be better for dark mode
// import 'prismjs/themes/prism-okaidia.css'
// global style overrides for notion
import "@/styles/notion.css";
// global style overrides for prism theme (optional)
import "@/styles/prism-theme.css";



export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

function MyApp({ Component, pageProps, router }: AppPropsWithLayout) {
  const isBasePath = router.pathname === '/'
  const isStartsWithBasePath = router.pathname.startsWith('/')
  function defaultGetLayout(page: ReactElement) {
    return <Layout>{page}</Layout>
  }
  // Use the layout defined at the page level, if available1
  const getLayout = isStartsWithBasePath ? defaultGetLayout : (page : ReactElement) => page

  return getLayout(
    <StyledThemeProvider>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      {/* @ts-ignore */}
      <Component {...pageProps} />
      <Analytics />
      <GlobalStyle />
    </StyledThemeProvider>,
  )
}

export default MyApp
