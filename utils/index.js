export async function fetchData(url) {
  // Set the required headers for the API request
  const response = await fetch(url);

  // Parse the response as JSON
  const result = await response.json();

  return result;
}

// import artificer from "../public/artificer.jpg";
import bard from "../public/bard.jpg";
import cleric from "../public/cleric.jpg";
import druid from "../public/druid.jpg";
// import paladin from "../public/paladin.jpg";
import ranger from "../public/ranger.jpg";
import sorcerer from "../public/sorcerer.jpg";
import warlock from "../public/warlock.jpg";
import wizard from "../public/wizard.jpg";

export function getClassImage(item) {
  return item === "bard"
    ? bard
    : item === "cleric"
    ? cleric
    : item === "druid"
    ? druid
    : item === "ranger"
    ? ranger
    : item === "sorcerer"
    ? sorcerer
    : item === "warlock"
    ? warlock
    : wizard;
}
