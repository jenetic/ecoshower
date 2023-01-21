// Calculations for stats + stopwatch
// milli = milliseconds
export const getMins = (milli) => {
  return ("0" + Math.floor((milli/60000) % 60)).slice(-2);
}

export const getSecs = (milli) => {
  return ("0" + Math.floor((milli/1000) % 60)).slice(-2);
}

// https://www.aquatell.ca/pages/how-household-water-usage-contributes-to-co2-emissions#:~:text=Showers%20and%20Baths,15%20minutes%20x%200.18%20lbs).

// 1 min = 2.1 gal water
export const getGallons = (milli) => {
  return (milli * 2.1 / 60000).toFixed(3);
}

// 1 gal (heated) water = 0.18 lb CO2 
export const getCo2Emissions = (milli) => {
  return (milli * 2.1 / 60000 * 0.18).toFixed(3);
}

// https://www.moving.com/tips/how-much-does-the-average-water-bill-cost/
// The average water bill of $72.93 a month is based on 100 gallons of water per day per person in a family of four
// This equals (72.93/4*100*30) = 0.0060775 dollars/gal
export const getWaterBill = (milli) => {
  return (getGallons(milli) * 0.0060775).toFixed(4);
}