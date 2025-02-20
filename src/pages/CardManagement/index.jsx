import React, { useState, useEffect } from "react";
import styles from "./CardManagement.module.css";
import routeCardManagement from "./route";
import { cardsService } from "services/api";
import { NavLink } from "react-router-dom";
import { routeAddEditCard } from "pages/AddEditCard";
const CardManagement = () => {
  const [cards, setCards] = useState([]);
  const [cardSets, setCardSets] = useState([]);
  useEffect(() => {
    const fetchCardSets = async () => {
      try {
        const response = await axios.get("/api/card-sets");
        setCardSets(response.data);
      } catch (error) {
        console.error("Error fetching card sets:", error);
      }
    };
    fetchCardSets();
  }, []);
  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await cardsService.getAllCards();
        console.log(response.data);
        setCards(response.data);
      } catch (error) {
        console.error("Error fetching cards:", error);
      }
    };
    fetchCards();
  }, []);
  return (
    <div className={styles.contents}>
      <div className={styles.mainContent}>
        <h2>Карты жителей</h2>
        <div className={styles.cardsList}>
          {cards.map((card) => (
            <div key={card.id} className={styles.cardItem}>
              <img
                src={`http://localhost:3000${card.image}`}
                alt={card.title}
              />
              <h3>{card.title}</h3>
              <p>{card.description}</p>
              <NavLink to={routeAddEditCard(card.id)}>
                <button>Редактировать</button>
              </NavLink>
            </div>
          ))}
        </div>
        <div className={styles.addCart}>
          <NavLink to={routeAddEditCard()} style={{ width: "40%" }}>
            <button>Добавить карту</button>
          </NavLink>
        </div>
      </div>
      <div className={styles.mainContent}>
        <h2>Наборы карт жители</h2>
        <div className={styles.cardsList}>
          {cardSets.map((set) => (
            <div key={set.id} className={styles.cardItem}>
              <img src={`http://localhost:3000${set.image}`} alt={set.name} />
              <h3>{set.name}</h3>
              <p>{set.description}</p>
              <NavLink to={routeAddEditCard(set.id)}>
                <button>Редактировать</button>
              </NavLink>
            </div>
          ))}
        </div>
        <div className={styles.addCart}>
          <NavLink to={routeAddEditCard()} style={{ width: "40%" }}>
            <button>Добавить набор</button>
          </NavLink>
        </div>
      </div>
    </div>
  );
};
export { routeCardManagement };

export default CardManagement;
