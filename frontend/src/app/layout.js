import { Inter } from "next/font/google";
import { UserProvider } from '@auth0/nextjs-auth0/client';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
    title: "IAM Demo",
    description: "React + NextJS with Auth0 demo",
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
                <AppRouterCacheProvider>
                    <ThemeProvider theme={theme}>
                        <UserProvider>
                            {children}
                        </UserProvider>
                    </ThemeProvider>
                </AppRouterCacheProvider>
            </body>
        </html>
    );
}
