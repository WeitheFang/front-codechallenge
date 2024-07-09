import React, {ReactElement} from 'react'
import {render, RenderOptions} from '@testing-library/react'
import {Provider} from 'react-redux'
import {store} from './store' // Adjusted import to use your store configuration

const AllProviders: React.FC<{children: React.ReactNode}> = ({children}) => {
    return <Provider store={store}>{children}</Provider>
}

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) => {
    return render(ui, {wrapper: AllProviders, ...options})
}

export * from '@testing-library/react'
export {customRender as render}
