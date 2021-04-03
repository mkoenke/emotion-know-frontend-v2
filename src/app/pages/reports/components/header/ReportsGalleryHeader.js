import { useSelector } from 'react-redux'

export default function ReportsGalleryHeader() {
  const currentUsername = useSelector(state => state.child.username)
  return (
    <>
      <header className="pageHeader" size="huge" textAlign="center">
        {currentUsername}'s Reports
      </header>
    </>
  )
}