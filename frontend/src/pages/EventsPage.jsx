import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Header from "../components/Layout/Header";
import Loader from "../components/Layout/Loader";
import FooterNav from "../components/Layout/FooterNav";
import EventCard from "../components/Events/EventCard";
import styles from "../styles/styles";

const EventsPage = () => {
  const { allEvents, isLoading } = useSelector((state) => state.events);
  const [eventData, setEventData] = useState([]);

  useEffect(() => {
    setEventData(allEvents || []);
  }, [allEvents]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <Header activeHeading={4} />
          <div className={`${styles.section}`}>
            {eventData.length > 0 ? (
              <EventCard active={true} data={eventData[0]} />
            ) : (
              <h1 className="text-center w-full pb-[100px] text-[20px]">
                No events found!
              </h1>
            )}
          </div>
        </div>
      )}

      
<FooterNav />
    </>
  );
};

export default EventsPage;
