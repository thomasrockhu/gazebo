import { useParams } from 'react-router-dom'

import { useAvailablePlans } from 'services/account'
import {
  formatNumberToUSD,
  isAnnualPlan,
  Plans,
  useProPlans,
} from 'shared/utils/billing'
import { calculatePriceProPlan } from 'shared/utils/upgradeForm'
import Icon from 'ui/Icon'

interface TotalPriceCalloutProps {
  newPlan: string
  seats: number
  setValue: (x: string, y: string) => void
}

const TotalPriceCallout: React.FC<TotalPriceCalloutProps> = ({
  newPlan,
  seats,
  setValue,
}) => {
  const { provider, owner } = useParams<{ provider: string; owner: string }>()
  const { data: plans } = useAvailablePlans({ provider, owner })
  const { proPlanMonth, proPlanYear } = useProPlans({ plans })
  const perMonthPrice = calculatePriceProPlan({
    seats,
    baseUnitPrice: proPlanMonth?.baseUnitPrice,
  })
  const perYearPrice = calculatePriceProPlan({
    seats,
    baseUnitPrice: proPlanYear?.baseUnitPrice,
  })
  const isPerYear = isAnnualPlan(newPlan)

  if (isPerYear) {
    return (
      <div className="bg-ds-gray-primary p-4">
        <p className="pb-3">
          <span className="font-semibold">
            {formatNumberToUSD(perYearPrice)}
          </span>
          /per month billed annually at {formatNumberToUSD(perYearPrice * 12)}
        </p>
        <p>
          &#127881; You{' '}
          <span className="font-semibold">
            save {formatNumberToUSD((perMonthPrice - perYearPrice) * 12)}
          </span>{' '}
          with the annual plan
        </p>
      </div>
    )
  }

  return (
    <div className="bg-ds-gray-primary p-4">
      <p className="pb-3">
        <span className="font-semibold">
          {formatNumberToUSD(perMonthPrice)}
        </span>
        /per month
      </p>
      <div className="flex flex-row gap-1">
        <Icon size="sm" name="lightBulb" variant="solid" />
        <p>
          You could save{' '}
          <span className="font-semibold">
            {formatNumberToUSD((perMonthPrice - perYearPrice) * 12)}
          </span>{' '}
          a year with the annual plan,{' '}
          <button
            className="cursor-pointer font-semibold text-ds-blue-darker hover:underline"
            onClick={() => setValue('newPlan', Plans.USERS_PR_INAPPY)}
          >
            switch to annual
          </button>
        </p>
      </div>
    </div>
  )
}

export default TotalPriceCallout