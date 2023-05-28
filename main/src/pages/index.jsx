import styles from '@/styles/Home.module.css';
import MoonLoader from "react-spinners/MoonLoader";
import { useEffect, useState } from 'react';

const Home = () => {

  let [submission_status, set_submission_status] = useState("");
  let [submitting, set_submitting] = useState(false);

  const post_data = async (data, form) => {
    try {
      let response = await fetch(`/api/travellers`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        }

      });

      let json = await response.json();

      setTimeout(() => {
        set_submission_status(json.data);
      }, 1000)

    } catch (error) {
      set_submission_status(error.message);
    }
  }

  const form_onsubmit_handler = (event) => {
    event.preventDefault();
    const { name, email, place, persons, budget } = event.target;

    const data = {
      name: name.value,
      email: email.value,
      place: place.value,
      persons: persons.value,
      budget: budget.value
    }


    set_submitting(true);

    post_data(data, event);
  }

  useEffect(() => {
    document.body.style.backgroundImage = "url('/background.jpg')";
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundAttachment = "fixed";
  }, [])

  return (
    <main className={`${styles.container}`}>

      {!submitting ?
        <>
          <h1> Fill The Details </h1>
          <p> Start your first journey with Travelopia </p>
          <form onSubmit={form_onsubmit_handler}>
            <input required name="name" placeholder="Name" type="text" />
            <input required name="email" placeholder="Email" type="email" />
            <select name="place">
              <option value=""> Where do you want to go? </option>
              <option value="india"> India </option>
              <option value="africa"> Africa </option>
              <option value="europe"> Europe </option>
            </select>
            <input required name="persons" placeholder="No. of Travellers" type="number" />
            <input required name="budget" placeholder="Budget per person ($) " type="number" />
            <div>
              <button id='submit_btn'> Submit </button>
            </div>

          </form>
        </>

        :

        <>
          {submission_status ?
            <>
              <h1 style={{ marginTop: "50px" }}> Submitted </h1>
              <h3> {submission_status} </h3>
              <button
                style={{ marginTop: "30px" }}
                onClick={() => { set_submitting(false); set_submission_status("") }}
              >
                Submit Another one
              </button>
            </>

            :

            <>
              <MoonLoader color="black" cssOverride={{ marginTop: "50px" }} />
            </>
          }

        </>

      }


    </main>
  )
}


export default Home;