import React, { useState, useEffect } from 'react';
import { trackSubmittedForm, trackUnsubmittedForm } from '../analytics/track-form';

const Waitlist = ({
  launchDate,
  textStyle,
  backgroundColor,
  timerStyle,
  timerContainerClass,
  timerValueClass,
  title,
  description,
  descriptionColor,
  buttonText,
  buttonColor,
  buttonHoverColor,
  inputPlaceholder,
  inputBorderColor,
  inputFocusColor,
}) => {
  const [timer, setTimer] = useState({ days: '', hours: '', minutes: '', seconds: '' });
  const [email, setEmail] = useState('');
  const [submittedForm, setSubmittedForm] = useState(false);
  const [interactedForm, setInteractedForm] = useState(false);
  const [formInput, setFormInput] = useState('');
  const [visitorUID, setVisitorUID] = useState(null);

  useEffect(() => {
    try {
      const storedUID = localStorage.getItem('visitorUID');
      if (storedUID) {
        setVisitorUID(storedUID);
      }
    } catch (error) {
      console.error('Error parsing visitorUID from localStorage:', error);
    }

    const handleBeforeUnload = (event) => {
      if (!submittedForm) {
        localStorage.setItem('unsubmittedFormInput:', interactedForm+"-"+formInput);
        trackUnsubmittedForm(visitorUID, interactedForm, formInput);
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [visitorUID, interactedForm, submittedForm, formInput]);

  const handleFormChange = (event) => {
    setEmail(event.target.value);
    setFormInput(event.target.value);
    if (!interactedForm) {
      setInteractedForm(true);
    }
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    setSubmittedForm(true);
    trackSubmittedForm(visitorUID, true, email);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      const targetDate = new Date(launchDate);
      const currentDate = new Date();
      const totalSeconds = Math.max(0, Math.floor((targetDate - currentDate) / 1000));

      setTimer({
        days: Math.floor(totalSeconds / (3600 * 24)),
        hours: String(Math.floor((totalSeconds % (3600 * 24)) / 3600)).padStart(2, '0'),
        minutes: String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0'),
        seconds: String(totalSeconds % 60).padStart(2, '0')
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, [launchDate]);

  return (
    // Responsive padding and width
    <div componentDataID="Email Sign Up" className={`flex flex-col items-center gap-4 p-8 sm:p-16 md:p-24 w-full ${backgroundColor}`}>
      {/* Responsive layout for timer */}
      <div className={`${timerContainerClass} ${backgroundColor} flex flex-wrap justify-center`}>
        {Object.entries(timer).map(([key, value], index) => (
          <React.Fragment key={key}>
            {/* Responsive text size for timer */}
            <span className={`${timerValueClass} ${timerStyle} text-2xl sm:text-4xl md:text-6xl lg:text-8xl`}>{value}</span>
            {index < 3 && <span className={`${timerValueClass} ${timerStyle} text-2xl sm:text-4xl md:text-6xl lg:text-8xl mx-1 sm:mx-2`}>:</span>}
          </React.Fragment>
        ))}
      </div>
      {/* Responsive text sizes for title and description */}
      <h2 className={`text-xl sm:text-2xl font-bold ${textStyle} text-center`}>{title}</h2>
      <p className={`${descriptionColor} text-sm sm:text-base text-center`}>{description}</p>
      {/* Responsive layout for form: stack on mobile, side-by-side on larger screens */}
      <form onSubmit={handleFormSubmit} className="flex flex-col sm:flex-row items-center gap-2 w-full max-w-md">
        <input
          type="email"
          placeholder={inputPlaceholder}
          className={`p-2 rounded-md border ${inputBorderColor} focus:outline-none focus:border-${inputFocusColor} w-full sm:w-auto`}
          value={email}
          onChange={handleFormChange}
          required
        />
        <button 
          type="submit" 
          className={`py-2 px-4 rounded-md ${buttonColor} hover:${buttonHoverColor} w-full sm:w-auto mt-2 sm:mt-0`}
        >
          {buttonText}
        </button>
      </form>
      {submittedForm && <p className='font-outfit font-bold text-orange-500 mt-2'>Thank you!</p>}
    </div>
  );
};

export default Waitlist;
