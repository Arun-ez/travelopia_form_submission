import styles from '@/styles/Home.module.css';
import { useEffect } from 'react';

const Home = () => {


  const post_data = async (data, form) => {
    try {
      let response = await fetch(`/api/travellers`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        }

      });

      let res = await response.json();

      console.log(res)

    } catch (error) {
      console.log(error);
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

    post_data(data, event);
  }

  useEffect(() => {
    document.body.style.backgroundImage = "url('/background.jpg')";
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundAttachment = "fixed";
  }, [])

  return (
    <main className={`${styles.container}`}>
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
        <input required name="persons" placeholder="No. of Travellers" type="text" />
        <input required name="budget" placeholder="Budget per person ($) " type="text" />
        <div>
          <button> Submit </button>
        </div>

      </form>
    </main>
  )
}


export default Home;