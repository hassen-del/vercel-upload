import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes" />
        <meta charSet="utf-8" />
        <meta name="description" content="Contractor Gorilla - Call Tracking Dashboard" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
