"use client";

import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { AppointmentType } from "@/typescript/types";

const DashboardCalendar = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/appointments`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );

        const result = await response.json();
        const events = result.data.map((appointment: AppointmentType) => ({
          title: appointment.service.name,
          start: new Date(appointment.appointmentDate),
          // end: new Date(appointment.appointmentDate),
        }));

        setEvents(events);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    fetchEvents();
  }, []);
  return (
    <div>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        headerToolbar={{
          start: "today prev,next",
          center: "title",
          end: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        eventClick={(info) => {
          alert(info.event.title);
        }}
      />
    </div>
  );
};

export default DashboardCalendar;
