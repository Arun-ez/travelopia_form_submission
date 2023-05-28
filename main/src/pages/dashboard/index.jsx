import Papa from 'papaparse';
import styles from '@/styles/Dashboard.module.css';
import MoonLoader from "react-spinners/MoonLoader";
import { saveAs } from 'file-saver';
import { useEffect, useState } from 'react';
import { MdDelete } from 'react-icons/md';
import { SlArrowLeft, SlArrowRight, SlRefresh } from 'react-icons/sl';


const Dashboard = () => {

  const [loading, set_loading] = useState(true);
  const [data, set_data] = useState([]);
  const [page, set_page] = useState(1);
  const [page_end_point, set_page_end_point] = useState(1);
  const [sort_order, set_sort_order] = useState("");
  const [timeOutId, set_timeoutId] = useState(null);

  const load = async () => {
    try {
      let response = await fetch(`/api/travellers?limit=10&page=${page}&sort=budget&order=${sort_order}`);
      let json = await response.json();
      set_page_end_point(json.total_pages || 1);
      set_data(json.data);
    } catch (error) {
      console.log(error);
    }
  }

  const page_onchange_handler = (payload) => {
    set_page((prev) => prev + payload);
  }

  const csv_download_handler = async () => {
    try {
      let response = await fetch(`/api/travellers`);
      let json = await response.json();
      let csv = Papa.unparse(json);
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
      saveAs(blob, 'submissions.csv');
    } catch (error) {
      console.log(error);
    }
  }

  const preFetchConfig = () => {
    set_data([]);
    set_loading(true);

    clearTimeout(timeOutId);
    let timerId = setTimeout(() => {
      set_loading(false);
    }, 5000)
    load();
    set_timeoutId(timerId);
  }

  const delete_item = async (id) => {
    try {
      let response = await fetch(`/api/travellers/${id}`, {
        method: 'DELETE'
      });

      load();
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    preFetchConfig();
    document.body.style.background = "white";
    return () => { clearTimeout(timeOutId) }
  }, [page, sort_order])

  return (
    <main className={styles.container}>
      <h1> Dashboard </h1>

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

            <b> Page {page} / {page_end_point} </b>

            <SlArrowRight
              style={page === page_end_point ? { pointerEvents: "none", opacity: "70%" } : {}}
              className={styles.arrow}
              onClick={() => { page_onchange_handler(1) }}
            />
          </div>

          <div>
            <SlRefresh className={styles.refresh} onClick={preFetchConfig} />
            <button onClick={csv_download_handler} > Save as CSV </button>
          </div>
        </div>

        {data.length ?

          <>
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
                  <th> Delete </th>
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
                      <td> <MdDelete onClick={() => { delete_item(_id) }} fontSize={20} cursor={'pointer'} /> </td>
                    </tr>
                  )

                })}
              </tbody>

            </table>

          </>

          :

          <>
            {loading ?
              <MoonLoader color="black" cssOverride={{ margin: "50px auto" }} />
              :
              <h1 style={{ textAlign: "center" }} > Not Data Found! </h1>
            }
          </>

        }
      </div>
    </main>
  )
}

export default Dashboard;
