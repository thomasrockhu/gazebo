import PropTypes from 'prop-types'
import { useForm } from 'react-hook-form'
import cs from 'classnames'

import { FormControls } from './FormControls'
import { DateItem } from './DateItem'
import { useLocationParams, ApiFilterEnum } from 'services/navigation'

import Card from 'ui/Card'
import User from 'ui/User'
import Button from 'ui/Button'
import Pagination from 'ui/Pagination'
import Select from 'ui/Select'

import { useUsers, useUpdateUser } from 'services/users'
import { getOwnerImg } from 'shared/utils'

const UserManagementClasses = {
  root: 'space-y-4 col-span-2',
  title: 'text-lg py-3',
  results: 'shadow divide-y divide-gray-200 divide-solid p-4',
  userTable: 'grid grid-cols-4 lg:gap-2 my-6',
  user: ({ lastseen, latestPrivatePrDate }) =>
    cs({
      'col-span-2': !lastseen || !latestPrivatePrDate,
      'col-span-3': !lastseen && !latestPrivatePrDate,
    }),
  ctaWrapper: 'flex items-center',
  cta: 'w-full truncate',
}

// Activate User hook,
function useActivateUser({ provider, owner, query }) {
  const { mutate, ...rest } = useUpdateUser({
    provider,
    owner,
    params: query,
  })

  function activate(user, activated) {
    return mutate({ targetUser: user, activated })
  }

  return { activate, ...rest }
}

function createPills({ isAdmin, email, student }) {
  return [
    isAdmin ? { label: 'Admin', highlight: true } : null,
    email,
    student ? 'Student' : null,
  ]
}

function UserManagement({ provider, owner }) {
  // local state is pulled from url params.
  // Defaults are not shown in url programically.
  const { params, updateParams } = useLocationParams({
    activated: '', // Default to no filter on activated
    isAdmin: '', // Default to no filter on isAdmin
    ordering: 'name', // Default sort is A-Z Name
    search: '', // Default to no seach on initial load
    page: 1, // Default to first page
    pageSize: 10, // Default page size
  })
  // Setup form defaults
  const { register, handleSubmit, control } = useForm({
    defaultValues: {
      search: params.search,
      activated: ApiFilterEnum.none,
      isAdmin: ApiFilterEnum.none,
      ordering: 'name',
      page: 1,
      pageSize: 1,
    },
  })
  // Get user API data
  const { data, isSuccess } = useUsers({
    provider,
    owner,
    query: params,
  })
  // Makes the PUT call to activate/deactivate selected user
  const { activate } = useActivateUser({ owner, provider, query: params })

  // Kick off a new render by updating the location params
  function updateQuery(data) {
    updateParams(data)
  }

  // Filter out page sizes which are larger then the total number of pages
  function _createPageSizes() {
    const max = data.totalPages
    const defaultPages = [10, 20, 50, 100]
    return defaultPages.filter((num) => num <= max)
  }

  return (
    <form
      className={UserManagementClasses.root}
      onSubmit={handleSubmit(updateQuery)}
    >
      <FormControls
        current={params}
        onChange={updateQuery}
        register={register}
        control={control}
      />
      <Card className={UserManagementClasses.results}>
        <h2 className={UserManagementClasses.title}>Users</h2>
        <div>
          {isSuccess &&
            data?.results?.map((user) => (
              <div
                key={user.username}
                className={UserManagementClasses.userTable}
              >
                <User
                  className={UserManagementClasses.user(user)}
                  username={user.username}
                  name={user.name}
                  avatarUrl={getOwnerImg(provider, user.username)}
                  pills={createPills(user)}
                />
                <DateItem
                  testId="last-seen"
                  label="Last seen:"
                  date={user.lastseen}
                />
                <DateItem
                  testId="last-pr"
                  label="Last pr:"
                  date={user.latestPrivatePrDate}
                />
                <div className={UserManagementClasses.ctaWrapper}>
                  <Button
                    className={UserManagementClasses.cta}
                    color={user.activated ? 'red' : 'blue'}
                    variant={user.activated ? 'outline' : 'normal'}
                    onClick={() => activate(user.username, !user.activated)}
                  >
                    {user.activated ? 'Deactivate' : 'Activate'}
                  </Button>
                </div>
              </div>
            ))}
        </div>
        <div className="flex justify-between">
          <Pagination
            className="flex-inital"
            onPageChange={(page) => updateQuery({ page })}
            pointer={parseInt(params.page, 10)}
            totalPages={data.totalPages || 1}
            next={data.next}
            previous={data.previous}
          />
          {_createPageSizes().length > 1 && (
            <Select
              className="flex-inital"
              onChange={(data) => updateQuery({ page: 1, pageSize: data })}
              items={_createPageSizes()}
              value={params.pageSize}
              placeholder="Page Size:"
            />
          )}
        </div>
      </Card>
    </form>
  )
}

UserManagement.propTypes = {
  provider: PropTypes.string.isRequired,
  owner: PropTypes.string.isRequired,
}

export default UserManagement
