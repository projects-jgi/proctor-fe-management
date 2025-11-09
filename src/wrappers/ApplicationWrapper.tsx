import React from 'react'
import WebsiteThemeProvider from './WebsiteThemeProvider'
import TanstackProvider from './TanstackProvider'

function ApplicationWrapper({ children }: { children: React.ReactNode }) {
    return (
        <WebsiteThemeProvider>
            <TanstackProvider>
                { children }
            </TanstackProvider>
        </WebsiteThemeProvider>
    )
}

export default ApplicationWrapper