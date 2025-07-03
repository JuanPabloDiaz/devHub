import Script from 'next/script'

const GA_TRACKING_ID = 'G-xxx'

export default function GoogleAnalytics() {
  if (!GA_TRACKING_ID || GA_TRACKING_ID === 'G-xxx') {
    return null
  }

  return (
    <>
      {/* Script de Google Analytics */}
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
      />

      {/* Configuración básica */}
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}');
          `,
        }}
      />
    </>
  )
}
