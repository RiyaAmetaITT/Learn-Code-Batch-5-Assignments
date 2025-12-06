import * as readline from 'readline';
import { getAdjacentCountries, getSupportedCountryCodes } from './countryData';

const readlineInterface = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function main() {
  console.log('Enter a country code (e.g., IN, US, NZ)');
  console.log(`Supported country codes: ${getSupportedCountryCodes().join(', ')}\n`);
  
  readlineInterface.question('Enter country code: ', (userInput: string) => {
    const countryCode = userInput.trim();
    
    if (countryCode.length === 0) {
      console.log('\nError: No country code provided.');
      readlineInterface.close();
      return;
    }
    
    console.log('\nResult: ');
    
    const adjacentCountriesResult = getAdjacentCountries(countryCode);
    
    if (adjacentCountriesResult.error) {
      console.log(`Error: ${adjacentCountriesResult.error}`);
    } else {
      console.log(`Country Code: ${countryCode.toUpperCase()}`);
      console.log(`Country Name: ${adjacentCountriesResult.countryName}`);
      console.log('\nAdjacent Countries:');
      
      if (adjacentCountriesResult.adjacentCountries.length === 0) {
        console.log('No adjacent countries (island nation or no land borders).');
      } else {
        adjacentCountriesResult.adjacentCountries.forEach((adjacentCountry, index) => {
          console.log(`  ${index + 1}. ${adjacentCountry}`);
        });
      }
    }
    
    readlineInterface.close();
  });
}

main();
