import styles from '@/styles/Dashboard.module.css';
import { useEffect, useState } from 'react';
import { SlArrowLeft, SlArrowRight } from 'react-icons/sl';

const Dashboard = () => {

  const [data, set_data] = useState(null);
  const [page, set_page] = useState(1);
  const [page_end_point, set_page_end_point] = useState(0);
  const [sort_order, set_sort_order] = useState("");

  const load = async () => {
    try {
      let response = await fetch(`/api/travellers?limit=10&page=${page}&sort=budget&order=${sort_order}`);
      let json = await response.json();
      set_page_end_point(json.total_pages);
      set_data(json.data);
    } catch (error) {
      console.log(error);
    }
  }

  const page_onchange_handler = (payload) => {

    set_page((prev) => prev + payload);
  }

  useEffect(() => {
    document.body.style.background = "white";
    load();
  }, [page, sort_order])

  return (
    <main className={styles.container}>
      <h1> Dashboard </h1>

      {data ?

        <>
          <div className={styles.table_container}>

            <div className={styles.table_navigator}>

              <div>
                <select name="sort" onChange={(event) => { set_sort_order(event.target.value) }}>
                  <option value=""> Sort By Budget </option>
                  <option value="asc"> Low to High </option>
                  <option value="dsc"> High to Low </option>
                </select>
              </div>

              <div className={styles.page_navigator}>
                <SlArrowLeft
                  style={page === 1 ? { pointerEvents: "none", opacity: "70%" } : {}}
                  className={styles.arrow}
                  onClick={() => { page_onchange_handler(-1) }}
                />
                <b> {page} </b>
                <SlArrowRight
                  style={page === page_end_point ? { pointerEvents: "none", opacity: "70%" } : {}}
                  className={styles.arrow}
                  onClick={() => { page_onchange_handler(1) }}
                />
              </div>

              <div>
                <button> Save as CSV </button>
              </div>
            </div>
            <table className={styles.table}>

              <thead>
                <tr>
                  <th> No. </th>
                  <th> ID </th>
                  <th> Name </th>
                  <th> Email </th>
                  <th> Destination </th>
                  <th> Budget(each in $) </th>
                  <th> No of Travellers </th>
                  <th> Net Amount($) </th>
                </tr>
              </thead>

              <tbody>
                {data.map(({ _id, name, email, place, budget, persons }, index) => {
                  return (
                    <tr key={index}>
                      <td> {index + 1} </td>
                      <td> {_id} </td>
                      <td> {name} </td>
                      <td> {email} </td>
                      <td> {place} </td>
                      <td> ${budget} </td>
                      <td> {persons} </td>
                      <td> ${budget * persons} </td>
                    </tr>
                  )

                })}
              </tbody>

            </table>
          </div>
        </>

        :

        <>
          <h1> Not Found </h1>
        </>

      }


    </main>
  )
}

export default Dashboard;
