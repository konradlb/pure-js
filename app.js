import { route } from "./router";
import axios from "axios";

let acces = false;
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
        acces = true;
        window.location.href = "#/success";
      })
      .catch((error) => {
        this.message = "Błędne dane logowania";
        acces = false;
        this.$refresh();
      });
  });
});

route("/success", "success", function () {
  if (!acces) {
    returned = true;
    window.location.href = "#";
  }
  this.message = "Zalogowano poprawnie";
});

route("*", "error404", function () {});
