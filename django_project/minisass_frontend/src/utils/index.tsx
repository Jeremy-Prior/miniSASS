import React from 'react';


export const handleSectionNavigation = (id: string) => {
  const element = document.getElementById(id);
  const offset = 45;
  const bodyRect = document.body.getBoundingClientRect().top;
  const elementRect = element?.getBoundingClientRect().top ?? 0;
  const elementPosition = elementRect - bodyRect;
  const offsetPosition = elementPosition - offset;

  window.scrollTo({
    top: offsetPosition,
    behavior: "smooth",
  });
};

const currentURL = window.location.href;
const parts = currentURL.split('/');
const baseUrl = parts[0] + '//' + parts[2];
const staticPath = baseUrl + '/static/images/';

export const globalVariables = {
  currentURL,
  baseUrl,
  staticPath,
};

/** Format date */
export function formatDate(d, reverseDate = false) {
  let month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2)
    month = '0' + month;
  if (day.length < 2)
    day = '0' + day;
  if (reverseDate) {
    return [day, month, year].join('-');
  } else {
    return [year, month, day].join('-');
  }
}