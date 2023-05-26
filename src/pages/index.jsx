import styles from '@/styles/Home.module.css';
import { useEffect } from 'react';

const Home = () => {

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

    console.log(data);
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
        <input name="name" placeholder="Name" type="text" />
        <input name="email" placeholder="Email" type="email" />
        <select name="place">
          <option value=""> Where do you want to go? </option>
          <option value="india"> India </option>
          <option value="africa"> Africa </option>
          <option value="europe"> Europe </option>
        </select>
        <input name="persons" placeholder="No. of Travellers" type="text" />
        <input name="budget" placeholder="Budget per person ($) " type="text" />
        <div>
          <button> Submit </button>
        </div>

      </form>
    </main>
  )
}


export default Home;