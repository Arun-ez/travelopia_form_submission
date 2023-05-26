import { useEffect } from 'react'

const Dashboard = () => {


  useEffect(() => {
    document.body.style.background = "white"
  }, [])

  return (
    <main>
      <h1> Dashboard </h1>
    </main>
  )
}

export default Dashboard;
