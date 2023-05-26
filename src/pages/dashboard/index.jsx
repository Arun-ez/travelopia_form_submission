import styles from '@/styles/Dashboard.module.css';
import { useEffect } from 'react'

const Dashboard = () => {



  useEffect(() => {
    document.body.style.background = "white"
  }, [])

  return (
    <main className={styles.container}>
      <h1> Dashboard </h1>

      <div>
        <table>

          <thead>
            <tr>
              <th> Name </th>
              <th> Email </th>
              <th> Place </th>
              <th> Budget(each in $) </th>
              <th> No of Travellers </th>
              <th> Net Amount($) </th>
            </tr>
          </thead>

          <tbody>

          </tbody>

        </table>
      </div>
    </main>
  )
}

export default Dashboard;
