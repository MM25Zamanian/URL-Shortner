import NavController, { NavDropdownController } from "./navigation";
import LoaderController from "./loader";

window.addEventListener('load', () => {
  const nav = new NavController();
  const nav_dropdown = new NavDropdownController();
  const loader = new LoaderController();
  loader.hidden_after_load();
})
