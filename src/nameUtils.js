/**
 * Translates searched name (in standard format) to the CSV naming format and returns the result.
 *
 * Also handles "Enter" key which was previosuly preserved as a flag but is unwanted noise here.
 *
 * @param {String} standardName - Full name in standard form "first_name last_name".
 * @returns {String} Full name in capitalized CSV form "last_name, first_name".
 */
export function standardToCsvNaming(standardName) {
  if (!standardName.includes(" ")) {
    return;
  }

  // Trim "Enter" key
  if (standardName.includes("Enter")) {
    standardName = standardName.slice(0, -1 * "Enter".length);
  }

  // Traverse to space delimiter
  let ch = 0;
  while (standardName[ch] != " ") {
    ch++;
  }

  // Partition at space delimiter
  // Capitalize partitions
  const firstName = standardName[0].toUpperCase() + standardName.slice(1, ch);
  const lastName =
    standardName[ch + 1].toUpperCase() + standardName.slice(ch + 2);
  return lastName + ", " + firstName;
}

/**
 * AI-GEN
 * Translates searched name (in CSV format) to the standard naming format and returns the result.
 *
 * @param {String} csvName Full name in CSV form "last_name, first_name".
 * @returns {String} Full name in capitalized standard form "first_name last_name".
 */
export function csvToStandardNaming(csvName) {
  if (!csvName.includes(",")) {
    return;
  }

  // Traverse to comma delimiter
  let ch = 0;
  while (csvName[ch] != ",") {
    ch++;
  }

  // Partition at comma delimiter
  // Capitalize partitions
  const lastName = csvName[0].toUpperCase() + csvName.slice(1, ch);
  const firstName = csvName[ch + 2].toUpperCase() + csvName.slice(ch + 3);
  return firstName + " " + lastName;
}
