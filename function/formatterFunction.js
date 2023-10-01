function convertToLonLatFormat(srcLat, srcLon, destLat, destLon) {
    const srcCoordinates = `lonlat:${srcLon},${srcLat}`;
    const destCoordinates = `lonlat:${destLon},${destLat}`;
    const lonlatFormat = `${srcCoordinates}|${destCoordinates}`;
    return lonlatFormat;
  }


module.exports = {
    convertToLonLatFormat
}