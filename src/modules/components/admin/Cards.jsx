import OneCard from "./OneCard";

function Cards({ cardsList }) {
  return (
    <div className="cards" style={{ marginTop: "80px" }}>
      {cardsList.map((result) => (
        <OneCard
          buttonText={result.buttonText}
          title={result.title}
          image={result.image}
          paragraf={result.paragraf}
          buttonLink={result.buttonLink}
          key={result.type}
        />
      ))}
    </div>
  );
}

export default Cards;
