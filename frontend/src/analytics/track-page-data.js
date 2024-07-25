// track-page-data.js
import { useEffect, useState } from 'react';

// This is the URL for all API calls
const URL = 'https://analytics-project-backend.vercel.app/';

// Custom hook to collect page interaction data
export function usePageInteractions() {
  const [pageData, setPageData] = useState({});
  const [visitorUID, setVisitorUID] = useState(null);

  useEffect(() => {
    // Get the visitor UID in local storage
    const storedUID = localStorage.getItem('visitorUID');
    if (storedUID) {
      setVisitorUID(storedUID);
    }
  }, []); // Initialize visitorUID on component mount

  useEffect(() => {
    if (!visitorUID) return; // Don't run if visitorUID is not available

    // Get the data from page interactions
    const pageName = "Landing Page"; // the name of the page
    const componentsScrolled = new Set(); // the react components user scrolled
    let percentPageScrolled = 0; // percentage of the page scrolled
    const timeEntered = new Date(); // the timestamp when the user entered the page
    let timeExited = ""; // the timestamp when the user exited the page
    let totalTimeSpentPage = 0; // calculates the total time spent on the page

    // Function to handle scroll events
    const handleScroll = () => {
      percentPageScrolled = Math.min(window.scrollY / document.documentElement.scrollHeight, 1) * 100;
    };

    window.addEventListener('scroll', handleScroll); // Add scroll event listener

    // Function to observe component visibility
    const handleIntersection = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          componentsScrolled.add(entry.target.getAttribute('componentDataID'));
        }
      });
    };

    // Intersection Observer
    const observer = new IntersectionObserver(handleIntersection, {
      root: null,
      rootMargin: '0px',
      threshold: 0.1 // Adjust threshold as needed
    });

    // Observe all elements with componentDataID
    document.querySelectorAll('[componentDataID]').forEach((component) => {
      observer.observe(component);
    });

    // Event listener to finalize data when the user leaves the page
    const handleBeforeUnload = () => {
      timeExited = new Date();
      totalTimeSpentPage = (timeExited - timeEntered) / 1000;

      const pageData = {
        pageName,
        componentsScrolled: Array.from(componentsScrolled),
        percentPageScrolled,
        timeEntered,
        timeExited,
        totalTimeSpentPage,
      };

      setPageData(pageData);
      localStorage.setItem('pageData', JSON.stringify({ visitorUID, pageData }));
      
      // Use sendBeacon instead of fetch for more reliable data sending on page unload
      const blob = new Blob([JSON.stringify({ uid: visitorUID, pageData })], { type: 'application/json' });
      navigator.sendBeacon(`${URL}/save-page-data`, blob);
    };

    // Add an interval to periodically save page data
    const saveInterval = setInterval(() => {
      const currentPageData = {
        pageName,
        componentsScrolled: Array.from(componentsScrolled),
        percentPageScrolled,
        timeEntered,
        timeExited: new Date(),
        totalTimeSpentPage: (new Date() - timeEntered) / 1000,
      };
      savePageData(visitorUID, currentPageData);
    }, 5000); // Save every 30 seconds

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('beforeunload', handleBeforeUnload);
      observer.disconnect();
      clearInterval(saveInterval);
    };
  }, [visitorUID]);

  return pageData;
}

// This function sends a POST request to the backend service with the time spent on website
export const savePageData = async (uid, pageData) => {
  try {
    const response = await fetch(`${URL}/save-page-data`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ uid, pageData }),
    });
    console.log(response);
    return response;
  } catch (error) {
    console.error('Error saving page data:', error);
  }
};
