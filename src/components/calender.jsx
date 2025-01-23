import React from 'react'
import './calender.css';

const calender = () => {
  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const monthsOfYear = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const currentDate = new Date();
  const [currentMonth, setCurrentMonth] = React.useState(currentDate.getMonth());
  const [currentYear, setCurrentYear] = React.useState(currentDate.getFullYear());
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

 const festivals = {
    '1-1': 'New Year 🎉',
    '12-25': 'Christmas 🎄',
    '2-14': 'Valentine\'s Day 💘',
    '3-17': 'St. Patrick\'s Day 🍀',
    '4-1': 'April Fool\'s Day 🤡',
    '7-4': 'Independence Day 🇺🇸',
    '10-31': 'Halloween 🎃',
    '11-24': 'Thanksgiving 🦃',
    '12-31': 'New Year\'s Eve 🥳'
    
};

  const handlePreviousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  return (
    <div className='calender'>
      <div className="navigate-date">
        <h2 className='month'>{monthsOfYear[currentMonth]}</h2>
        <h2 className='year'>{currentYear}</h2>
        <div className="buttons">
          <i className='bx bx-chevron-left' onClick={handlePreviousMonth}></i>
          <i className='bx bx-chevron-right' onClick={handleNextMonth}></i>
        </div>
      </div>
      <div className="weekdays">
        {daysOfWeek.map((day, index) => (
          <span key={index}>{day}</span>
        ))}
      </div>
      <div className="days">
        {Array.from({ length: daysInMonth }, (_, index) => {
          const day = index + 1;
          const isCurrentDay = 
            day === currentDate.getDate() &&
            currentMonth === currentDate.getMonth() &&
            currentYear === currentDate.getFullYear();
          const festivalKey = `${currentMonth + 1}-${day}`;
          const festival = festivals[festivalKey];
          return (
            <span 
              key={index} 
              className={isCurrentDay ? 'current-day' : ''} 
              title={festival ? festival : ''}
            >
              {day}
            </span>
          );
        })}
      </div>
    </div>
  )
}

export default calender