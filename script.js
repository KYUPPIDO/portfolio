gsap.registerPlugin(Observer);

const sections = document.querySelectorAll("section");
const images = document.querySelectorAll(".bg");
const headings = gsap.utils.toArray(".section-heading");
const outerWrappers = gsap.utils.toArray(".outer");
const innerWrappers = gsap.utils.toArray(".inner");
const splitHeadings = headings.map(splitHeading);
let currentIndex = -1;
const wrap = gsap.utils.wrap(0, sections.length);
let animating;

gsap.set(outerWrappers, { yPercent: 100 });
gsap.set(innerWrappers, { yPercent: -100 });

function gotoSection(index, direction) {
  const targetIndex = wrap(index);
  animating = true;
  const fromTop = direction === -1;
  const dFactor = fromTop ? -1 : 1;
  const tl = gsap.timeline({
    defaults: { duration: 1.45, ease: "power2.inOut" },
    onComplete: () => {
      animating = false;
    }
  });

  if (currentIndex >= 0) {
    gsap.set(sections[currentIndex], { zIndex: 0 });
    tl.to(
      splitHeadings[currentIndex].chars,
      {
        autoAlpha: 0,
        yPercent: -35 * dFactor,
        duration: 1.05,
        ease: "power3.inOut",
        stagger: {
          each: 0.025,
          from: "random"
        }
      },
      0
    );
    tl.to(images[currentIndex], { yPercent: -15 * dFactor }).set(
      sections[currentIndex],
      { autoAlpha: 0 }
    );
  }

  gsap.set(sections[targetIndex], { autoAlpha: 1, zIndex: 1 });
  tl.fromTo(
    [outerWrappers[targetIndex], innerWrappers[targetIndex]],
    { yPercent: (i) => (i ? -100 * dFactor : 100 * dFactor) },
    { yPercent: 0 },
    0
  )
    .fromTo(images[targetIndex], { yPercent: 15 * dFactor }, { yPercent: 0 }, 0)
    .fromTo(
      splitHeadings[targetIndex].chars,
      {
        autoAlpha: 0,
        yPercent: 150 * dFactor
      },
      {
        autoAlpha: 1,
        yPercent: 0,
        duration: 0.9,
        ease: "power2.out",
        stagger: {
          each: 0.015,
          from: "random"
        }
      },
      0.2
    );

  currentIndex = targetIndex;
}

function splitHeading(heading) {
  if (!heading || heading.dataset.split === "true") {
    return heading ? Array.from(heading.querySelectorAll(".char")) : [];
  }

  heading.dataset.split = "true";
  const text = heading.textContent || "";
  heading.textContent = "";
  const chars = [];

  Array.from(text).forEach((char) => {
    const span = document.createElement("span");
    span.className = "char";
    span.textContent = char === " " ? "\u00A0" : char;
    heading.appendChild(span);
    chars.push(span);
  });

  return chars;
}

let lastScrollTime = 0;
const scrollCooldown = 650;

Observer.create({
  type: "wheel,touch,pointer",
  wheelSpeed: -1,
  onDown: () => {
    const now = Date.now();
    if (!animating && now - lastScrollTime > scrollCooldown) {
      lastScrollTime = now;
      gotoSection(currentIndex - 1, -1);
    }
  },
  onUp: () => {
    const now = Date.now();
    if (!animating && now - lastScrollTime > scrollCooldown) {
      lastScrollTime = now;
      gotoSection(currentIndex + 1, 1);
    }
  },
  tolerance: 14,
  preventDefault: true
});

gotoSection(0, 1);
