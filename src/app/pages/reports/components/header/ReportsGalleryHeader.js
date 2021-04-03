import { useSelector } from 'react-redux'

export default function ReportsGalleryHeader() {

  const currentUserName = useSelector(state => state.child.username)

  return (
    <>
      <header className="pageHeader" size="huge" textAlign="center">
        {this.props.child.username}'s Reports
      </header>
    </>
  )
}