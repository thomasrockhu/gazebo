import A from 'ui/A'
import CopyClipboard from 'ui/CopyClipboard/CopyClipboard'
import PropTypes from 'prop-types'
import Icon from 'ui/Icon'
import { Fragment } from 'react'
import InstructionBox from './instructionBox/InstructionBox'
import { useCommits } from 'services/commits'
import { useParams } from 'react-router'
import { useEffect } from 'react'
import Banner from 'ui/Banner'

const GithubConfigBanner = ({ privateRepo }) =>
  privateRepo && (
    <div className="mt-8">
      <Banner
        title={
          <div className="flex justify-center gap-2">
            <h2>Install Codecov GitHub app</h2>
          </div>
        }
      >
        <p>
          The best way to integrate with Codecov.io is to{' '}
          <A to={{ pageName: 'codecovGithuhApp' }}>
            Install Codecov&apos;s GitHub App
          </A>
          . Once installed, you are done! You do not need to set a{' '}
          <A to={{ pageName: 'teamBot' }}>Team Bot</A> because Codecov will use
          the integration to post statuses and comments.
        </p>
      </Banner>
    </div>
  )

GithubConfigBanner.propTypes = {
  privateRepo: PropTypes.bool.isRequired,
}

function useRedirectUsers() {
  const { provider, owner, repo } = useParams()
  const { data: commits } = useCommits({ provider, owner, repo })

  useEffect(() => {
    if (commits?.length) window.location = `/${provider}/${owner}/${repo}`
  }, [provider, owner, repo, commits])
}

function New({ data }) {
  useRedirectUsers()

  if (!data || !data?.repo?.uploadToken) {
    return null
  }

  const { uploadToken: token, private: privateRepo } = data?.repo
  const { isPartOfOrg } = data

  const PrivateRepoScope = (
    <Fragment>
      <p className="text-base">
        Copy the below token and set it in your CI environment variables.
      </p>
      <p className="flex flex-row justify-center text-s mt-4">
        Codecov Token={' '}
        <span className="font-mono bg-ds-gray-secondary text-ds-gray-octonary h-auto xl:h-4">
          {token}
        </span>
        <CopyClipboard string={token} />
      </p>
    </Fragment>
  )

  const PublicRepoScope = isPartOfOrg ? (
    <Fragment>
      <p className="text-base">
        If the public project is on TravisCI, CircleCI, AppVeyor, Azure
        Pipelines, or GitHub Actions an upload token is not required. Otherwise,
        you’ll need to set the token below and set it in your CI environment
        variables.
      </p>
      <p className="flex flex-row justify-center text-s mt-4">
        Codecov Token={' '}
        <span className="font-mono bg-ds-gray-secondary text-ds-gray-octonary h-auto xl:h-4">
          {token}
        </span>
        <CopyClipboard string={token} />
      </p>
    </Fragment>
  ) : (
    <p className="text-base">
      If the public project on TravisCI, CircleCI, AppVeyor, Azure Pipelines, or
      GitHub Actions an upload token is not required. Otherwise, you’ll need a
      token to from the authorized member or admin.
    </p>
  )

  return (
    <div className="flex w-4/5 md:w-3/5 lg:w-2/5 flex-col">
      <h1 className="font-semibold text-3xl my-4">
        Let&apos;s get your repo covered
      </h1>

      <p className="border-b border-ds-gray-tertiary pb-8 text-base">
        Codecov requires an upload in your test suite to get started. Using the{' '}
        <A to={{ pageName: 'uploader' }}>Codecov Uploader</A>
        <span className="inline-block">
          <Icon name="external-link" size="sm" />
        </span>{' '}
        and the repository upload token, upload your coverage reports to
        Codecov. See our <A to={{ pageName: 'docs' }}> quick start guide </A>
        <span className="inline-block">
          <Icon name="external-link" size="sm" />
        </span>{' '}
        to learn more.
      </p>

      <GithubConfigBanner privateRepo={privateRepo} />

      <Fragment>
        <h2 className="font-semibold mt-8 text-base">Step 1</h2>
        <p className="text-base">
          Run your normal test suite to generate code coverage reports in a
          supported format (often an .xml format).
        </p>

        <h2 className="font-semibold mt-8 text-base">Step 2</h2>
        <div>{privateRepo ? PrivateRepoScope : PublicRepoScope}</div>

        <h2 className="font-semibold mt-8 text-base">Step 3</h2>
        <p className="text-base">
          Download the <A to={{ pageName: 'uploader' }}>uploader </A>
          <span className="inline-block">
            <Icon name="external-link" size="sm" />
          </span>{' '}
          and share your coverage reports with Codecov, by adding the the
          following commands to your CI pipeline:
        </p>

        <InstructionBox />

        <p className="text-base">
          It is highly recommended to{' '}
          <A to={{ pageName: 'integrityCheck' }}>
            integrity check the uploader
          </A>
          <span className="inline-block">
            <Icon name="external-link" size="sm" />
          </span>
          .
        </p>

        <h2 className="font-semibold mt-8 text-base">
          {' '}
          🎉 Confirming completion
        </h2>
        <p className="text-base">
          These steps should be added to the CI configuration. Codecov jobs
          occur after the test runner ran and output coverage report. Once
          uploader runs it will return a link where you can view your reports on
          Codecov.
        </p>
      </Fragment>
    </div>
  )
}

New.propTypes = {
  data: PropTypes.object,
}

export default New
