// ================================================================

// Titanic Dataset challenges! 

// Your goal is to write some functions that will extract
// relevant data from the dataset. 

// Write your code here in this file. 

// *************************************
// Test your code by running: `npm test`
// *************************************

// Each of the functions below expects to receive the Titanic data
// as the parameter data. Your goal is to extract the relevant 
// piece of information from the data and return it. 

// =================================================================

// 1 ---------------------------------------------------------------
// Return the total number of passengers. 
// Returns a number.

const getTotalPassengers = (data) => {
	return data.length
}

// 2 ---------------------------------------------------------------
// Return the number of surviving passengers. A passenger survived 
// if their survived property is "Yes".
// Return a number.

const getSurvivorCount = (data) => {
	// map and filter always return a NEW ARRAY
	// to return a number, add .length at the end and it will return the number
	return data.filter(p => p.fields.survived === 'Yes').length
}

// 3 ---------------------------------------------------------------
// Return the number of passengers who did not survive. A passenger
// did not survive if their survived property is "No".
// Return a number.

const getCasualityCount = (data) => {
	return data.filter(p => p.fields.survived === 'No').length
}

// 4 ---------------------------------------------------------------
// Return the number of passengers in any class. This function 
// takes the data and the passenger class a string. Find all of the 
// passengers whose pclass matches and return the count. 
// Return a number

const countPassengersInClass = (data, pclass) => {
	const passengersByClass = data.filter(p => p.fields.pclass === pclass)
	return passengersByClass.length
}

// 5 ---------------------------------------------------------------
// Return the number of survivors in a class. This function takes 
// the data and passenger class. 
// Return the count of survivors in that pclass.

const getSurvivorCountForClass = (data, pclass) => {
    const survivorsByClass = data.filter(p => p.fields.survived === 'Yes' && p.fields.pclass === pclass)
    return survivorsByClass.length
}

// 6 ---------------------------------------------------------------
// Return the number of passengers who did not survive in a class.
// This function takes the data and the passenger class and returns 
// the number of passengers who did not survive for that class. 

const getCasualityCountForClass = (data, pclass) => {
	const survivorsByClass = data.filter(p => p.fields.survived === 'No' && p.fields.pclass === pclass)
    return survivorsByClass.length
}

// 7 ---------------------------------------------------------------
// Return the age of the youngest passenger. You need to filter
// passenger data where the age is missing. 

const getMinAge = (data) => {
	//  map into array of ages and then use Math.min() function to find min age
	const ages = data.map(p => p.fields.age).filter(age => age !== undefined)
	// [44, 22 33, undefined, 75, 12, undefined, 10] - we need to filter out the undefined!

	// by adding ... it turns it into a list of parameters!
	return Math.min(...ages)
}

// 8 ---------------------------------------------------------------
// Return the age of the oldest passenger. Filter passengers where 
// age is missing.

const getMaxAge = (data) => {
	const ages = data.map(p => p.fields.age).filter(age => age !== undefined)
	return Math.max(...ages)
}

// 9 ---------------------------------------------------------------
// Return the number of passengers that embarked at a given stop. 
// Each passenger has a embarked property with a value of: S, C,
// or Q. This function takes in the passenger data and the 
// embarkation code. Return the count of passenegers with that code.

const getEmbarkedCount = (data, embarked) => {
	const passengersByEmbarkation = data.filter(p => p.fields.embarked === embarked)
	return passengersByEmbarkation.length
}

// 10 ---------------------------------------------------------------
// Return the lowest fair paid by any passenger. The fare is missing 
// for some passengers you'll need to filter this out!

const getMinFare = (data) => {
	// filter out passengers whose fare field is missing
	const fares = data
		.filter(p => p.fields.fare !== undefined && p.fields.fare !== null)
		.map(p => p.fields.fare)
	// Find the minimum fare among the remaining passengers
	return Math.min(...fares)
}

// 11 ---------------------------------------------------------------
// Return the highest fare paid by any passenger. Some of the 
// passengers are missing data for fare. Be sure to filter these! 

const getMaxFare = (data) => {
	// filter out passengers whose fare field is missing
	const fares = data
		.filter(p => p.fields.fare !== undefined)
		.map(p => p.fields.fare)
	// Find the maximum fare among the remaining passengers
	return Math.max(...fares)
}

// 12 ---------------------------------------------------------------
// Return the count of passengers by gender. Each passenger object has
// "sex" property that is either "male" or "female"

const getPassengersByGender = (data, gender) => {
	// Filter the passengers whose sex field matches the provided gender
	const passengersByGender = data.filter(p => p.fields.sex === gender)
	return passengersByGender.length
}

// 13 ---------------------------------------------------------------
// Return the number of passengers who survived by gender. This 
// function receives parameters of data and gender. Match the gender
// to the "sex" property and check the "survived" property. 

const getSurvivorsByGender = (data, gender) => {
	const survivorsByGender = data.filter(p => p.fields.survived === 'Yes' && p.fields.sex === gender)
    return survivorsByGender.length
}

// 14 ---------------------------------------------------------------
// Return the number of passengers who did not survived by gender. 

const getCasualitiesByGender = (data, gender) => {
	const casualtiesByGender = data.filter(p => p.fields.survived === 'No' && p.fields.sex === gender)
    return casualtiesByGender.length
}

// 15 --------------------------------------------------------------
// Return the total of all fares paid. Add up all of the fares and 
// return that number. Be sure to filter the passengers records 
// where the fare is missing! 

const getTotalFare = (data) => {
	// reduce is different from map and filter because it takes TWO parameters like --> ( () => {}, 0 )
	// the 2nd parameter is the starting value
	// acc = accumulator and p = passenger
	// 0 = starting value
	const total = data
		.filter(p => p.fields.fare !== undefined)
		.reduce( (acc, p) => p.fields.fare + acc, 0)
	return total
}

// 16 --------------------------------------------------------------
// Return the average fare paid. Add up all of the fares and divide 
// by the number of passengers. Be sure to filter passengers who are
// missing a fare! 

const getAverageFare = (data) => {
	// Filter out passengers who are missing fare data
	const fares = data
		.filter(p => p.fields.fare !== undefined)
		.map(p => p.fields.fare)
	// Sum up the fares of remaining passengers
	const totalFare = fares.reduce((sum, fare) => sum + fare, 0)
	// to get average, return the total fare divided by the number of fares
	return totalFare / fares.length
}

// 17 --------------------------------------------------------------
// Return the median fare. The median is the value equal distance
// from the minimum and maximum values. Filter passengers who are 
// missing fares. Sort the passengers on the fare pick the one in
// the middle: [11,33,77] <- 33 is the median. If number of items 
// is even average the two middle values. For example: [2,4,5,16]
// 4 + 5 = 9 / 2 median is 4.5!

const getMedianFare = (data) => {
	// Filter out passengers who are missing fare data
	const fares = data
		.filter(p => p.fields.fare !== undefined)
		.map(p => p.fields.fare)
		// Sort the fares from smallest to largest
		.sort((a, b) => a - b)
    // If the length of fares is odd, return the middle fare
    if (fares.length % 2 !== 0) {
        return fares[Math.floor(fares.length / 2)]
    } 
    // If the length of fares is even, return the average of the two middle fares
    const mid1 = fares[fares.length / 2 - 1]
    const mid2 = fares[fares.length / 2]
    return (mid1 + mid2) / 2
}

// 18 --------------------------------------------------------------
// Return the average age of all passengers. Add all ages and divide 
// by the number of passenegers. Be sure to filter where ages are not 
// available. 

const getAverageAge = (data) => {
	// Filter out passengers who are missing age data
	const ages = data
		.filter(p => p.fields.age !== undefined)
		.map(p => p.fields.age)
	// Sum up the ages of remaining passengers
	const totalAges = ages.reduce((sum, age) => sum + age, 0)
	// to get average, return the total age divided by the number of passengers
	return totalAges / ages.length
}

// 19 --------------------------------------------------------------
// Return the median age from passengers.

const getMedianAge = (data) => {
	// Filter out passengers who are missing age data
	const ages = data
		.filter(p => p.fields.age !== undefined)
		.map(p => p.fields.age)
		// Sort the fares from smallest to largest
		.sort((a, b) => a - b)
    // If the length of ages is odd, return the middle fare
    if (ages.length % 2 !== 0) {
        return ages[Math.floor(ages.length / 2)]
    } 
    // If the length of fares is even, return the average of the two middle fares
    const mid1 = ages[ages.length / 2 - 1]
    const mid2 = ages[ages.length / 2]
    return (mid1 + mid2) / 2
}

// 20 --------------------------------------------------------------
// Add up all of the ages for the gender provided and divide by the 
// the total number. 

const getAverageAgeByGender = (data, gender) => {
	// Filter out passengers who are missing age data
	const ages = data
		.filter(p => p.fields.age !== undefined && p.fields.sex === gender)
		.map(p => p.fields.age)
	// Sum up the ages of remaining passengers
	const totalAges = ages.reduce((sum, age) => sum + age, 0)
	// to get average, return the total age divided by the number of passengers
	return totalAges / ages.length
}

// --------------------------------------------------------------
// --------------------------------------------------------------
module.exports = {
	getTotalPassengers,
	getSurvivorCount,
	getCasualityCount,
  countPassengersInClass,
  getSurvivorCountForClass,
	getCasualityCountForClass,
	getMinAge,
	getMaxAge,
	getEmbarkedCount,
	getMaxFare,
	getMinFare,
	getPassengersByGender,
	getSurvivorsByGender,
	getCasualitiesByGender,
	getTotalFare,
	getAverageFare,
	getMedianFare,
	getAverageAge,
	getMedianAge,
	getAverageAgeByGender
}