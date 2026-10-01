import { ready, scrollspy } from "catpow/util";

ready(() => {
	scrollspy(document.querySelectorAll(".has-animation"), { rootMargin: "0% 0% -25%" });
});
