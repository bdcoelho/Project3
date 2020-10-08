const querystring = require("querystring");
require("dotenv").config();


const appSecret = process.env.GOOGLE_MAPS_API_KEY;

module.exports = {
    buildGeoCodeURL: function(searchTerm, type) {
        let queryURL = "";
        var queryParams = { key: appSecret };
        if (type === "Place") {
          queryURL = "https://maps.googleapis.com/maps/api/place/autocomplete/json?";
          queryParams.input = searchTerm.trim().toLowerCase().includes("australia")
            ? searchTerm.trim()
            : searchTerm.trim() + " Australia";
        } else if (type === "GeoCode") {
          queryURL = "https://maps.googleapis.com/maps/api/geocode/json?";
          queryParams.address = searchTerm.trim();
        }
        return queryURL + querystring.stringify(queryParams);
    },

    parseGeoJSON: function(element) {
        if (element.types.includes("street_number")) {
          this.streetNum = element.long_name;
        } else if (element.types.includes("route")) {
          this.streetName = element.long_name;
        } else if (element.types.includes("locality")) {
          this.suburb = element.long_name;
        } else if (element.types.includes("administrative_area_level_1")) {
          this.state = element.long_name;
        } else if (element.types.includes("postal_code")) {
          this.postCode = element.long_name;
        }
      }
  };