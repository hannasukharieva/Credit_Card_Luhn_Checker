// All valid credit card numbers
const valid1 = [4, 5, 3, 9, 6, 7, 7, 9, 0, 8, 0, 1, 6, 8, 0, 8];
const valid2 = [5, 5, 3, 5, 7, 6, 6, 7, 6, 8, 7, 5, 1, 4, 3, 9];
const valid3 = [3, 7, 1, 6, 1, 2, 0, 1, 9, 9, 8, 5, 2, 3, 6];
const valid4 = [6, 0, 1, 1, 1, 4, 4, 3, 4, 0, 6, 8, 2, 9, 0, 5];
const valid5 = [4, 5, 3, 9, 4, 0, 4, 9, 6, 7, 8, 6, 9, 6, 6, 6];

// All invalid credit card numbers
const invalid1 = [4, 5, 3, 2, 7, 7, 8, 7, 7, 1, 0, 9, 1, 7, 9, 5];
const invalid2 = [5, 7, 9, 5, 5, 9, 3, 3, 9, 2, 1, 3, 4, 6, 4, 3];
const invalid3 = [3, 7, 5, 7, 9, 6, 0, 8, 4, 4, 5, 9, 9, 1, 4];
const invalid4 = [6, 0, 1, 1, 1, 2, 7, 9, 6, 1, 7, 7, 7, 9, 3, 5];
const invalid5 = [5, 3, 8, 2, 0, 1, 9, 7, 7, 2, 8, 8, 3, 8, 5, 4];

// Can be either valid or invalid
const mystery1 = [3, 4, 4, 8, 0, 1, 9, 6, 8, 3, 0, 5, 4, 1, 4];
const mystery2 = [5, 4, 6, 6, 1, 0, 0, 8, 6, 1, 6, 2, 0, 2, 3, 9];
const mystery3 = [6, 0, 1, 1, 3, 7, 7, 0, 2, 0, 9, 6, 2, 6, 5, 6, 2, 0, 3];
const mystery4 = [4, 9, 2, 9, 8, 7, 7, 1, 6, 9, 2, 1, 7, 0, 9, 3];
const mystery5 = [4, 9, 1, 3, 5, 4, 0, 4, 6, 3, 0, 7, 2, 5, 2, 3];

// An array of all the arrays above
const batch = [valid1, valid2, valid3, valid4, valid5, invalid1, invalid2, invalid3, invalid4, invalid5, mystery1, mystery2, mystery3, mystery4, mystery5];

const validateCred = (array) => {
  // Copy the number of the card being checked
  const editableArray = [...array]
  // Reverse the order of card numbers
  const reverseArray = editableArray.reverse()
  // Remove the last number of the card
  const shiftedValue = reverseArray.shift()
  /**
   * Apply the Luhn algorithm based on the number's index (odd or even)
   * 
   * @see https://en.wikipedia.org/wiki/Luhn_algorithm#Description
  */
  const resultArray = reverseArray.map((element, index) => {
    if (index % 2 === 0) {
      const doubleElem = element * 2
      if (doubleElem > 9) {
        return doubleElem - 9
      } else {
        return doubleElem
      }
    } else {
      return element
    }
  })

  // Sum up all the card's numbers, including the first element which was shifted
  const sum = resultArray.reduce((sum, element) => {
    return sum + element;
  }, shiftedValue)

  // Divide the result sum by 10; if there is no remainder, the card is valid
  if (sum % 10 === 0) {
    return 'valid'
  } else {
    return array
  }
}

// Check the exixting array of cards and return a new array with only invalid cards
const findInvalidCards = (nestedArray) => {
  const invalidArray = []
  const validatedArray = nestedArray.map(validateCred)

  validatedArray.forEach((element) => {
    if (element !== 'valid') {
      invalidArray.push(element)
    }
  })
  return invalidArray
}

// Iterate through the array of invalid cards and return the names of the issuing companies
const idInvalidCardCompanies = (invalidCards) => {
  const companies = []
  invalidCards.forEach((element) => {
    switch(element[0]) {
      case 3:
        companies.push('Amex')
        break;
      case 4:
        companies.push('Visa')
        break;
      case 5:
        companies.push('Mastercard')
        break;
      case 6:
        companies.push('Discover')
        break;
    }
  })
  // Get rid of the duplicates
  const invalidCardIssuers = [...new Set(companies)]

  return invalidCardIssuers;
}
console.log(idInvalidCardCompanies(findInvalidCards(batch)))






