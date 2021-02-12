import { route } from "./router";
import axios from "axios";

let access = false;
let returned = false;

route("/", "home", function () {
  if (returned) {
    this.message = "Dostęp zabroniony, podaj login i hasło aby uzyskać dostęp";
  } else {
    this.message = "Podaj login i hasło";
  }
  this.$on("#loginForm", "submit", (e) => {
    e.preventDefault();

    const login = {
      username: document.getElementById("user").value,
      password: document.getElementById("password").value,
    };

    axios
      .post("https://zwzt-zadanie.netlify.app/api/login", login)
      .then((response) => {
        access = true;
        window.location.href = "#/success";
      })
      .catch((error) => {
        this.message = "Błędne dane logowania";
        access = false;
        this.$refresh();
        username: document.getElementById("user").value = login.username;
      });
  });
});

route("/success", "success", function () {
  if (!access) {
    returned = true;
    window.location.href = "#";
  }
  this.message = "Zalogowano poprawnie";
});

route("*", "error404", function () {});
