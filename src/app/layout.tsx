'use client'
import { Provider } from 'react-redux'
import '~/styles/global.scss'
import { store } from '~/store'

export default function RootLayout ({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
    <body>
    <Provider store={store}>
      {children}
    </Provider>
    </body>
    </html>
  )
}
