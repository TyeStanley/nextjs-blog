import React from "react";
import classes from "./footer.module.css";

export default function Footer() {
  return (
    <footer className={classes.footer}>
      <div className={classes.wrapper}>
        <div className={classes.col}>
          <h2>About the App</h2>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo
            iure adipisci, doloremque suscipit praesentium natus, rerum debitis
            cumque ipsa illo architecto delectus consequatur ex harum voluptates
            repellat quae. Quam, vero.
          </p>
        </div>
        <div className={classes.col}>
          <h2>Contacts</h2>
          <span>Phone +123 456 789</span>
          <span>YouTube: MyBlog</span>
          <span>GitHub: MyBlog</span>
        </div>
        <div className={classes.col}>
          <h2>Location</h2>
          <span>Continent: North America</span>
          <span>Country: United States</span>
          <span>Current Location: Las Vegas</span>
        </div>
      </div>
    </footer>
  );
}
