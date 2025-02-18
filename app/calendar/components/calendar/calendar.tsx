"use client";

import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import interactionPlugin, { Draggable } from "@fullcalendar/interaction";
import resourceTimelinePlugin from "@fullcalendar/resource-timeline";
import { useEffect } from "react";

export const CalendarComponent = () => {
  useEffect(() => {
    const containerEl = document.querySelector("#events") as HTMLElement;
    if (containerEl) {
      new Draggable(containerEl, {
        itemSelector: ".event",
        eventData: (eventEl) => {
          return {
          title: eventEl.innerText,
        };
        },
      });
    }
  }, []);
  return (
    <>
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin,resourceTimelinePlugin]}
        initialView="dayGridMonth"
        weekends={false}
        events={[
          { title: "event 1", date: "2025-01-27" },
          { title: "event 2", date: "2025-01-28" },
        ]}
        dateClick={(info) => {
          console.log(info);
        }}
        editable
        droppable
        
      />

      <ul id="events">
        <li className="event">event 1</li>
        <li className="event">event 2</li>
        <li className="event">event 3</li>
      </ul>
    </>
  );
};
