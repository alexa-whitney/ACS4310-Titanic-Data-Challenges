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

// ===============================================================

// ---------------------------------------------------------------
// 1 -------------------------------------------------------------
// Return an array of all the values in data for a given property
// For example if property = 'fare' the output should be a list of 
// all fares something like: [7.3125, 15.75, 7.775, 10.5, ...]
// Or if property = 'age' -> [40, 26, 22, 28, 23, 45, 21, ...]

const getAllValuesForProperty = (data, property) => {
	// data is the array of passengers
	// property is the property we're interested in, like fare or age
	return data.map(p => p.fields[property])
}

// 2 -------------------------------------------------------------
// Return an array where a given property matches the given value
// For example property = 'sex' and value = 'male' returns an 
// array of all the male passengers [{...}, {...}, {...}, ...]
// Here the goal is to return an array of passenger objects 
// that patch the property and value. 

const filterByProperty = (data, property, value) => {
	// value is the value we want to match (like 'male' for 'sex', a specific age, etc.)
	return data.filter(p => p.fields[property] === value)
}

// 3 -------------------------------------------------------------
// Filter out missing values
// Return an array where the objects that have undefined for a 
// given property have been removed

const filterNullForProperty = (data, property) => {
	return data.filter(p => p.fields[property] !== undefined)
}

// 4 -------------------------------------------------------------
// Abstract the sum by creating a function that returns the sum 
// for any (numeric) property
// Return the total of all values for a given property.
// You need to remove any missing values because n + undefined = NaN!
// REDUCE

const sumAllProperty = (data, property) => {
	// Filter out passengers who are missing the specific property
	const validData = data.filter(p => p.fields[property] !== undefined)
	// Use reduce to sum up the values of the property
	// sum is the accumulated value (which starts from 0 as specified by the second parameter of reduce)
	// p is the current passenger
	// p.fields[property] is added to sum for each passenger, resulting in the total sum of the values of the property
	const total = validData.reduce((sum, p) => sum + p.fields[property], 0)
	return total
}


// 5 -------------------------------------------------------------
// Count unique values for property. The goal here is return an 
// object with keys equal to the unique values for a property and
// values equal to the number of times that property appears. For
// example the embarked property has three unique values: S, C, 
// and Q, and a couple passengers have undefined for this property. 
// So the output should be: { S: 644, C: 168, Q: 77, undefined: 2 }
// That is 644 passengers embarked at South Hampton. 168 embarked 
// at Cherbourg, 77 emabrked at Queenstown, and 2 are undedfined
// reduce(() => {}, {})
// if propery does not exist
//    add that property with value of 1
// else
// 	  add 1 to property value

const countAllProperty = (data, property) => {
	return data.reduce((acc, p) => {
		const key = p.fields[property]
		// If the property already exists in the count object, increment its value
		if (key in acc) {
			acc[key]++
		} else {
			// If the property does not exist in the count object, add it with a value of 1
			acc[key] = 1
		}
		return acc
	}, {}) // start with an empty object
}

// Use reduce with an object as the starting accumulator! 


// 6 ------------------------------------------------------------
// Make histogram. The goal is to return an array with values 
// of a properties divided into buckets and counting the number
// of items in each bucket.
// step is the value division. For example if step were 10 and the 
// property was age. You would be counting how many passengers were 
// ages 0 - 10, 11 - 20, 21 - 30 etc. 
// [5, 50, 140]
// divides everyone into buckets and then counts up the number in each bucket
// step is the range we want to look at 
// loop over all teh data, look at the property, divide by the step, and round down (ex. 2.6 would be index 2). That will give you
// the index where you need to add 1 to the value

// PSEUDOCODE STEPS
// data.filter() undefined values for property
// data.reduce() to an array
// 		set index to value divided step
// 		floor the index
// 		acc -> []
// 		if acc at index equals undefined
// 			acc at index set to 1
// 		else
// 			acc at index add 1

const makeHistogram = (data, property, step) => {
	// get rid of missing data
	const results = data
		.filter(p => p.fields[property] !== undefined)
		.reduce((acc, p) => {
			const value = p.fields[property]
			// which bucket does this value fall into? Use Math.floor to round down
			const index = Math.floor(value / step)
			// to count, check first if something exists, if not create 1, if yes then add 1 to it
			if (acc[index] === undefined) {
				acc[index] = 1
			} else {
				acc[index] += 1
			}
			return acc
		}, [])
	// remove the empty spots in the array by creating a new array with no 0s!
	// what this is saying is within the results array, if the value (v) is TRUE (if it exists), then log the value (v), if 
	// there is nothing there, then log 0.
	//  use .from instead of .map because .map skips over 0 entries
	return Array.from(results, (v) => v || 0)

}

// Note! There may not be no values for a particular step. For example
// if we get passenger ages in increments of 5 there are 0 passengers in the 
// 70 bracket but there are passengers in 60, and 80. So you might end up with 
// Age bucket
//   5 10 15 20  25  30 35 40 45 50 55 60 65 70 75            80  85
// [40,22,16,86,114,106,95,72,48,41,32,16,15, 4, 6,<1 empty item>, 1]
// There are 0 passengers in the 76 to 80 year age bucket. You may have the 
// right answer but if that slot in the array is empty the test will fail 
// becuase that index should show 0. There are 0 passengers in that age range. 
// Could use Array.from([4,12,1,132,100,,7], (v) => v || 0)
// Convert this array to another array and use the format of if v is true, use v and if it's not there, use 0


// 7 ------------------------------------------------------------
// normalizeProperty takes data and a property and returns an 
// array of normalized values. To normalize the values you need
// to divide each value by the maximum value in the array.

// find the max value
// divide each value by the max value

const normalizeProperty = (data, property) => {
	// Create an array of the values for the specified property
	const values = data
		.filter(p => p.fields[property] !== undefined)
		// iterate through the array and take the value of the property we're interested in and add it to our values list
		.map(p => p.fields[property])

	// Find the maximum value from that array using Math.max()
	const maxVal = Math.max(...values)

	// Create a new array where each value is divided by the max value
	const normalizedValues = values.map(value => (value / maxVal))

	return normalizedValues
}

// Normalizing is an important process that can make many other
// operations easier. Normalizing allows you to take numbers in one 
// range and convert them to any other range. 
// For this example you need to find the max value first before 
// generating an array of normalized values.

// If the range of data included negative numbers or did not start at 0
// we might also need to find the minimum value. 

// 8 ------------------------------------------------------------
// Write a function that gets all unique values for a property. 
// Given the array of data and a property string it should return
// an array of all of the unique values under that property. 
// For example if the property string were "sex" this function 
// would return ['male', 'female']

// how many unique times does a value appear for that property
// embarked ['S', 'C', 'Q', 'undefined']

// reduce(() => {}, {})
// reduce((acc, p) => {...}, {})

const getUniqueValues = (data, property) => {
    // Create a new Set from the property values, excluding undefined
    const uniqueValues = new Set(
        data
			// make sure to filter out the undefined!
            .filter(p => p.fields[property] !== undefined)
            .map(p => String(p.fields[property]))
    );

	// convert the Set back into an array and stringify it to pass the test
	return Array.from(uniqueValues, value => String(value))
}

// There are a couple ways to do this. 
// Use an object and add each value as a key. The value can be anything. 
// Use a Set. Be sure to convert this to an array before returning! 

// --------------------------------------------------------------
// --------------------------------------------------------------
module.exports = {
	getAllValuesForProperty,
	filterByProperty,
	filterNullForProperty,
	sumAllProperty,
	countAllProperty,
	makeHistogram,
	normalizeProperty,
	getUniqueValues
}