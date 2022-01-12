import Event from './Event.jsx'
import { ref, onValue } from "firebase/database";
import { useEffect, useState } from "react";
import { db as database } from "../firebase";

function Volunteer() {
  const [events, setEvents] = useState();

  const eventInfo = ref(database, '/Events');

  useEffect(() => {
    const getEvents = async () => {
      const eventData = await onValue(eventInfo, (snapshot) => {
        var data = snapshot.val();
        var output = []
        if (data){
          var keys = Object.keys(data)
          for (let i = 0; i < keys.length; i++){
            if (keys[i] !== "safe"){
              output.push(data[keys[i]]);
            }
          }
        }
        setEvents(output);
      });
    };
    getEvents();  
  }, []);
  
  if (events){
    if (events.length === 0){
      return(
        <div>
          <div className = "subtitle">
              <h2>Volunteer</h2>
          </div>
          <div className = "events-container">
            <h3 style = {{padding:"40px"}}>Sorry, there are no events at this time.</h3>
          </div>
        </div>
      );
    }else{
      return (
        <div>
          <div className = "subtitle">
              <h2>Volunteer</h2>
          </div>
          <div className = "events-container">
            {events.map(event => <Event name = {event.name} description = {event.desc} volunteers = {event.volunteers} image = {event.image}/>)}
          </div>
        </div>
      );
    }
  }else{
    return (
      <div>
        <div className = "subtitle">
            <h2>Volunteer</h2>
        </div>
        <div className = "events-container">
          <h1 style = {{padding:"40px"}}>Loading...</h1>
        </div>
      </div>
    );
  }
}

export default Volunteer