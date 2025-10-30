import React from 'react'
import WebsiteThemeProvider from './WebsiteThemeProvider'

function ApplicationWrapper({ children }: { children: React.ReactNode }) {
    return (
        <WebsiteThemeProvider>
            { children }
        </WebsiteThemeProvider>
    )
}

export default ApplicationWrapper