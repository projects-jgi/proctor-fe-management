import React from 'react'
import WebsiteThemeProvider from './WebsiteThemeProvider'
import TanstackProvider from './TanstackProvider'
import { Toaster } from '@/components/ui/sonner'

function ApplicationWrapper({ children }: { children: React.ReactNode }) {
    return (
        <WebsiteThemeProvider>
            <TanstackProvider>
                { children }
                <Toaster />
            </TanstackProvider>
        </WebsiteThemeProvider>
    )
}

export default ApplicationWrapper