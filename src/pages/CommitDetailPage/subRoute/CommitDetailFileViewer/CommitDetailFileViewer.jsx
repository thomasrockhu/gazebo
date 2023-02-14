import RawFileviewer from 'shared/RawFileviewer'
import { useCommitTreePaths } from 'shared/treePaths'
import Breadcrumb from 'ui/Breadcrumb'

function CommitDetailFileViewer() {
  const { treePaths } = useCommitTreePaths()

  return (
    <RawFileviewer
      title={
        <div className="text-sm font-normal">
          <Breadcrumb paths={treePaths} />
        </div>
      }
      withKey={false}
    />
  )
}

export default CommitDetailFileViewer