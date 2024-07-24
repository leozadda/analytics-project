// This is the URL for all API calls
const URL = process.env.REACT_APP_API_URL;

// This gets a user's IP address
export const fetchUserIP = async () => {
  try {
    const response = await fetch('https://api.ipify.org?format=json');
    const data = await response.json();
    return data.ip;
  } catch (error) {
    console.error("Error: ", error);
  }
};

// This sends a user's IP address to the server
export const saveUserIP = async (uid, userIPAddress) => {
  try {
    const response = await fetch(`${URL}/save-ip-address`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ uid, userIPAddress }),
    });
    localStorage.setItem('userIPAddress', userIPAddress);

    // Check if the response is valid JSON
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.indexOf("application/json") !== -1) {
      const data = await response.json();
      return data.ip;
    } else {
      console.error("Error: Response is not valid JSON");
    }
  } catch (error) {
    console.error("Error: ", error);
  }
};