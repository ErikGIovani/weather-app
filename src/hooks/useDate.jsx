import { useState, useEffect, useContext } from "react";

import CountryContext from "@/context/CountryContext";

export default function useDate(date) {
  const { countries } = useContext(CountryContext);
  const [getDate, setGetDate] = useState(date);

  useEffect(() => {
    setGetDate(new Date());
  }, [countries]);

  let dayNamesEs = [
    "Domingo",
    "Lunes",
    "Martes",
    "Miércoles",
    "Jueves",
    "Viernes",
    "Sábado",
  ];
  let monthNamesEs = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];
  let dayNamesEn = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let monthNamesEn = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let hours = getDate?.getHours();
  let formatHours = hours > 12 ? hours - 12 : hours;
  let minutes = getDate?.getMinutes();
  let formatMinutes = minutes > 9 ? minutes : `0${minutes}`;

  let meridian = hours > 12 ? "PM" : "AM";

  let dayOfWeek =
    countries.language === "es"
      ? dayNamesEs[getDate?.getDay()]
      : dayNamesEn[getDate?.getDay()];
  let day = getDate?.getDate();
  let month =
    countries.language === "es"
      ? monthNamesEs[getDate?.getMonth()]
      : monthNamesEn[getDate?.getMonth()];

  let currentHours = `${formatHours}:${formatMinutes} ${meridian}`;
  let currenDate =
    countries.language === "es"
      ? `${dayOfWeek} ${day} de ${month}`
      : `${dayOfWeek} ${day} of ${month}`;

  const dayFunc = (dateArg) => {
    return countries.language === "es"
      ? dayNamesEs[new Date(dateArg).getDay()]
      : dayNamesEn[new Date(dateArg).getDay()];
  };

  return { date: currenDate, hours: currentHours, dayFunc };
}
