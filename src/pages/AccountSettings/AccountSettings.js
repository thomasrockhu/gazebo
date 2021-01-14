import { lazy } from 'react'
import { useParams, Switch, Route } from 'react-router-dom'

import { useBaseUrl } from 'shared/router'
import PageLayout from 'layouts/SidebarLayout'

import SideMenu from './SideMenu'
import AdminTab from './tabs/Admin'
import BillingAndUsersTab from './tabs/BillingAndUsers'
import YAMLTab from './tabs/YAML'

const CancelPlanTab = lazy(() => import('./tabs/CancelPlan'))
const UpgradePlanTab = lazy(() => import('./tabs/UpgradePlan'))
const InvoicesTab = lazy(() => import('./tabs/Invoices'))
const InvoiceDetailTab = lazy(() => import('./tabs/InvoiceDetail'))

function AccountSettings() {
  const { provider, owner } = useParams()
  const baseUrl = useBaseUrl()

  // it's a slightly different menu / pages if the owner is a Org or a user
  // so we will need to fetch the information at this level
  // and render different UI according to the type of user

  return (
    <PageLayout sidebar={<SideMenu baseUrl={baseUrl} />}>
      <Switch>
        <Route path={baseUrl + ''} exact>
          <BillingAndUsersTab provider={provider} owner={owner} />
        </Route>
        <Route path={baseUrl + 'billing/upgrade'} exact>
          <UpgradePlanTab provider={provider} owner={owner} />
        </Route>
        <Route path={baseUrl + 'billing/cancel'} exact>
          <CancelPlanTab provider={provider} owner={owner} />
        </Route>
        <Route path={baseUrl + 'invoices'} exact>
          <InvoicesTab provider={provider} owner={owner} />
        </Route>
        <Route path={baseUrl + 'invoices/:id'} exact>
          <InvoiceDetailTab provider={provider} owner={owner} />
        </Route>
        <Route path={baseUrl + 'yaml'} exact>
          <YAMLTab />
        </Route>
        <Route path={baseUrl + 'admin'} exact>
          <AdminTab />
        </Route>
      </Switch>
    </PageLayout>
  )
}

export default AccountSettings
