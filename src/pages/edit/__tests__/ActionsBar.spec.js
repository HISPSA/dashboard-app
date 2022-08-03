import { useD2 } from '@dhis2/app-runtime-adapter-d2'
import { render } from '@testing-library/react'
import React from 'react'
import { Provider } from 'react-redux'
import configureMockStore from 'redux-mock-store'
import { DEFAULT_STATE_EDIT_DASHBOARD } from '../../../reducers/editDashboard.js'
import ActionsBar from '../ActionsBar.js'

const mockStore = configureMockStore()

jest.mock('@dhis2/app-runtime-adapter-d2')
jest.mock('@dhis2/app-runtime')

/* eslint-disable react/prop-types */
jest.mock('@dhis2/ui', () => {
    const originalModule = jest.requireActual('@dhis2/ui')

    return {
        __esModule: true,
        ...originalModule,
        ButtonStrip: function Mock({ children }) {
            return <div className="ui-ButtonStrip">{children}</div>
        },
        Button: function Mock({ children }) {
            return <div className="ui-Button">{children}</div>
        },
    }
})
/* eslint-enable react/prop-types */

/* eslint-disable react/prop-types */
jest.mock(
    '../../../components/OfflineTooltip.js',
    () =>
        function Mock({ children }) {
            return <div className="OfflineTooltip">{children}</div>
        }
)
/* eslint-enable react/prop-types */

jest.mock(
    '../FilterSettingsDialog',
    () =>
        function Mock() {
            return <div className="mock-filter-settings-dialog" />
        }
)

jest.mock(
    '@dhis2/d2-ui-translation-dialog',
    () =>
        function Mock() {
            return <div className="mock-translation-dialog" />
        }
)

/* eslint-disable react/prop-types */
jest.mock(
    '../../../components/ConfirmActionDialog',
    () =>
        function MockConfirmActionDialog({ open }) {
            return open ? <div className="mock-confirm-action-dialog" /> : null
        }
)
/* eslint-enable react/prop-types */

useD2.mockReturnValue({
    d2: {
        currentUser: 'rainbowDash',
    },
})

jest.mock('@dhis2/app-runtime', () => ({
    useOnlineStatus: jest.fn(() => ({ online: true, offline: false })),
    useDataEngine: jest.fn(() => ({ dataEngine: {} })),
    useAlert: jest.fn(() => ({})),
}))

test('renders the ActionsBar without Delete when no delete access', async () => {
    const store = {
        editDashboard: {
            id: 'rainbowDash',
            name: 'Rainbow Dash',
            access: {
                update: true,
                delete: false,
            },
            printPreviewView: false,
        },
    }

    const { container } = render(
        <Provider store={mockStore(store)}>
            <ActionsBar />
        </Provider>
    )

    expect(container).toMatchSnapshot()
})

test('renders only the Go to Dashboards button when no update access', async () => {
    const store = {
        editDashboard: {
            id: 'rainbowDash',
            name: 'Rainbow Dash',
            access: {
                update: false,
                delete: false,
            },
            printPreviewView: false,
        },
    }

    const { container } = render(
        <Provider store={mockStore(store)}>
            <ActionsBar />
        </Provider>
    )

    expect(container).toMatchSnapshot()
})

test('renders Save and Discard buttons but not translation dialog when new dashboard (no dashboard id)', async () => {
    const store = {
        editDashboard: DEFAULT_STATE_EDIT_DASHBOARD,
    }

    const { container } = render(
        <Provider store={mockStore(store)}>
            <ActionsBar />
        </Provider>
    )

    expect(container).toMatchSnapshot()
})

test('renders Translate, Delete, and Discard buttons when delete access', async () => {
    const store = {
        editDashboard: {
            id: 'rainbowDash',
            name: 'Rainbow Dash',
            access: {
                update: true,
                delete: true,
            },
            printPreviewView: false,
        },
    }

    const { container } = render(
        <Provider store={mockStore(store)}>
            <ActionsBar />
        </Provider>
    )

    expect(container).toMatchSnapshot()
})
