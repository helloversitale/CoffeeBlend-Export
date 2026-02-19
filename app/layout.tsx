import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';

export const metadata: Metadata = {
  title: 'CoffeeBlend Dynamic Headlines',
  description: 'Premium Coffee Experience',
  openGraph: {
    images: ['https://bolt.new/static/og_default.png'],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['https://bolt.new/static/og_default.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body>
        {children}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                var voiceflowConfig = {
                  verify: { enabled: false },
                  assistant: {
                    stylesheet: './style.css'
                  }
                };
                window.voiceflow = window.voiceflow || [];
                window.voiceflow.push(['init', voiceflowConfig]);
              })();
            `,
          }}
        />
        <Script src="https://cdn.voiceflow.com/widget/bundle.mjs" strategy="afterInteractive" />
      </body>
    </html>
  );
}
