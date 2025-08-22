class TimezoneHelper {
  getCountryTimezone(country) {
    const countryLower = country.toLowerCase();
    
    const timezoneMap = {
      'serbia': 'Europe/Belgrade',
      'united states': 'America/New_York',
      'usa': 'America/New_York',
      'united kingdom': 'Europe/London',
      'uk': 'Europe/London',
      'france': 'Europe/Paris',
      'germany': 'Europe/Berlin',
      'croatia': 'Europe/Zagreb',
      'hungary': 'Europe/Budapest',
      'czech republic': 'Europe/Prague',
      'poland': 'Europe/Warsaw',
      'italy': 'Europe/Rome',
      'spain': 'Europe/Madrid',
      'netherlands': 'Europe/Amsterdam',
      'belgium': 'Europe/Brussels',
      'austria': 'Europe/Vienna',
      'sweden': 'Europe/Stockholm',
      'norway': 'Europe/Oslo',
      'denmark': 'Europe/Copenhagen',
      'finland': 'Europe/Helsinki',
      'ireland': 'Europe/Dublin',
      'portugal': 'Europe/Lisbon',
      'greece': 'Europe/Athens',
      'romania': 'Europe/Bucharest',
      'bulgaria': 'Europe/Sofia',
      'estonia': 'Europe/Tallinn',
      'latvia': 'Europe/Riga',
      'lithuania': 'Europe/Vilnius',
      'japan': 'Asia/Tokyo',
      'china': 'Asia/Shanghai',
      'australia': 'Australia/Sydney',
      'canada': 'America/Toronto',
      'india': 'Asia/Kolkata',
      'brazil': 'America/Sao_Paulo',
      'egypt': 'Africa/Cairo',
      'mexico': 'America/Mexico_City',
      'thailand': 'Asia/Bangkok',
      'russia': 'Europe/Moscow',
      'ukraine': 'Europe/Kiev',
      'belarus': 'Europe/Minsk',
      'moldova': 'Europe/Chisinau',
      'slovakia': 'Europe/Bratislava',
      'slovenia': 'Europe/Ljubljana',
      'montenegro': 'Europe/Podgorica',
      'albania': 'Europe/Tirane',
      'north macedonia': 'Europe/Skopje',
      'bosnia and herzegovina': 'Europe/Sarajevo'
    };

    return timezoneMap[countryLower] || 'UTC';
  }
}

module.exports = { TimezoneHelper };
