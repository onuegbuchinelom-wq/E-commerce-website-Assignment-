import "./About.css";

const defaultValues = [
  {
    title: "Thoughtfully Sourced",
    text: "Every product on GLOWMART is chosen with care — no filler, no noise, just what actually belongs in your routine."
  },
  {
    title: "Simple by Design",
    text: "Skincare, makeup and fragrance shouldn't take a manual. We keep things clear so you can shop with confidence."
  },
  {
    title: "For Real Routines",
    text: "We build for the routine you'll actually keep — not the one that looks good for a week and disappears."
  }
];

function About({
  eyebrow = "Our Story",
  heading = "Beauty, made",
  accentWord = "simple again.",
  subtext = "GLOWMART was built on a simple idea — that skincare, makeup and fragrance shouldn't feel complicated. We bring together everyday essentials from formulas we trust, so your routine stays honest, simple, and yours.",
  values = defaultValues
}) {
  return (
    <div className="about">
      <section className="about__hero">
        <span className="about__eyebrow">{eyebrow}</span>
        <h1 className="about__heading">
          {heading}
          <br />
          <span className="about__heading-accent">{accentWord}</span>
        </h1>
        <p className="about__subtext">{subtext}</p>
      </section>

      <section className="about__values">
        {values.map((value, index) => (
          <div className="about__value" key={index}>
            <h3 className="about__value-title">{value.title}</h3>
            <p className="about__value-text">{value.text}</p>
          </div>
        ))}
      </section>
    </div>
  );
}

export default About;