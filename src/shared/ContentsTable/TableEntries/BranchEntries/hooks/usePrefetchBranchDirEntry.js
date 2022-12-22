import { useQueryClient } from '@tanstack/react-query'
import { useParams } from 'react-router-dom'

import Api from 'shared/api'

const query = `
query BranchContents(
  $name: String!
  $repo: String!
  $branch: String!
  $path: String!
  $filters: PathContentsFilters!
) {
  owner(username: $name) {
    username
    repository(name: $repo) {
      branch(name: $branch) {
        head {
          pathContents(path: $path, filters: $filters) {
            ... on PathContents {
              results {
                __typename
                hits
                misses
                partials
                lines
                name
                path
                percentCovered
            ... on PathContentFile {
              isCriticalFile
            }
              }
            }
            __typename
          }
        }
      }
    }
  }
}
`

export function usePrefetchBranchDirEntry({ branch, path, filters }) {
  const { provider, owner, repo } = useParams()
  const queryClient = useQueryClient()

  const runPrefetch = async () =>
    await queryClient.prefetchQuery(
      ['BranchContents', provider, owner, repo, branch, path, filters],
      () =>
        Api.graphql({
          provider,
          repo,
          query,
          variables: {
            name: owner,
            repo,
            branch,
            path,
            filters,
          },
        }).then(
          (res) => res?.data?.owner?.repository?.branch?.head?.pathContents
        ),
      {
        staleTime: 10000,
      }
    )

  return { runPrefetch }
}