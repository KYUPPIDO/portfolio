// import { gsap } from "https://cdn.skypack.dev/gsap";
let open = false;

const trigger = document.querySelector(".header__trigger");
if (trigger) {
  const headerNav = document.querySelector(".header__nav");
  trigger.addEventListener("click", () => {
    trigger.classList.toggle("open");
    headerNav.classList.toggle("open");
    const amount = open ? 0 : 100;
    gsap.
    timeline({}).
    to(headerNav, 0.4, {
      "--panel-bottom-1": amount,
      ease: "Power1.easeOut" }).

    to(
    headerNav,
    0.4,
    {
      "--panel-bottom-2": amount,
      ease: "Power1.easeOut" },

    0.1).

    to(
    headerNav,
    0.4,
    {
      "--panel-bottom-3": amount,
      ease: "Power1.easeOut" },

    0.2).

    to(
    headerNav,
    0.4,
    {
      "--panel-bottom-4": amount,
      ease: "Power1.easeOut" },

    0.3);

    open = !open;
  });
}