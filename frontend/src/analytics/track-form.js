const URL = 'https://analytics-project-nine.vercel.app';

export function trackSubmittedForm(uid, submittedForm, email) {
  console.log("Submitted Form - UID:", uid, "Submitted:", submittedForm, "Email:", email);

  fetch(`${URL}/track-submitted-form`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ uid, submittedForm, email })
  })
  .then(response => response.json())
  .then(data => {
    console.log("Successfully tracked submitted form:", data);
  })
  .catch(error => {
    console.error("Error tracking submitted form:", error);
  });
}

export function trackUnsubmittedForm(uid, interactedForm, formInput) {
  console.log("Unsubmitted Form - UID:", uid, "Interacted:", interactedForm, "Input:", formInput);

  fetch(`${URL}/track-unsubmitted-form`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ uid, interactedForm, formInput })
  })
  .then(response => response.json())
  .then(data => {
    console.log("Successfully tracked unsubmitted form:", data);
  })
  .catch(error => {
    console.error("Error tracking unsubmitted form:", error);
  });
}
