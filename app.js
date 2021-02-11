import { route } from "./router";

const name = "Konrad";

route("/", "home", function () {
  this.title = "Home";
  this.where = ` jesteś w home`;
});

route("/success", "success", function () {
  this.title = "Zalogowano poprawnie";
});

route("/ex2", "example2", function () {
  this.title = "przykład drugi";
  this.counter = 0;
  this.$on(".my-button", "click", () => {
    this.counter += 1;
    this.$refresh();
  });
});

route("*", "error404", function () {});
