const fetchCountries = async (name) => {
    const response = await fetch(`https://restcountries.com/v2/name/${name}`);
    if (!response.ok) {
    throw new Error('Country not found');
    }
    const data = await response.json();
    return data;
};

export default fetchCountries;
