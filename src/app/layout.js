import "./globals.css";
import { ThemeProvider } from "./themeProvider";
import PostProvider from "./context/postContext";
import { NextAuthProvider } from "@/app/providers";
import FetchPostProvider from "./context/fetchPost";
import ReactQueryProvider from "./reactQueryProvider";


import "@fontsource/inter";
import "@fontsource/inter/400.css"; 
import "@fontsource/inter/400-italic.css";


export default function RootLayout({ children}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={` antialiased`}
      >
<ReactQueryProvider>
        <ThemeProvider 
        attribute='class'
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
        >
          <NextAuthProvider>
            <FetchPostProvider>
          <PostProvider>
        {children}
        </PostProvider>
        </FetchPostProvider>
          </NextAuthProvider>
        </ThemeProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
