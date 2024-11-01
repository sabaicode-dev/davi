import React, { useState, useEffect } from "react";
import Card from "./Card";

interface CardContainerProps {
  numCards: number;
}

interface CardData {
  id: number;
}

const CardContainer: React.FC<CardContainerProps> = ({ numCards }) => {
  const [cards, setCards] = useState<CardData[]>([]);

  // Initialize the cards based on the numCards prop
  useEffect(() => {
    const initialCards = Array.from({ length: numCards }, (_, i) => ({
      id: i + 1,
    }));
    setCards(initialCards);
  }, [numCards]);

  const deleteCard = (index: number) => {
    setCards((prevCards) => prevCards.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-5">
      {cards.map((card, index) => (
        <Card key={card.id} index={index} onDelete={() => deleteCard(index)} />
      ))}
    </div>
  );
};

export default CardContainer;
