// index .js
import "./styles.css";
import { home } from "./home.js";
import { menu } from "./menu.js";
import { contact } from "./contact.js";

home();

const buttons = document.querySelectorAll("button");
buttons.forEach((buttons) => {
    buttons.addEventListener("click", (e) => {
        const btnCls = e.target.className;
        switch (btnCls) {
            case "home":
                home();
                break;
            case "menu":
                menu();
                break;
            case "contact":
                contact();
                break;
        }
    });
});
