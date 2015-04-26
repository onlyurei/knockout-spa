/* jshint ignore:start */
if (typeof define !== 'function') { var define = require('amdefine')(module) }
/* jshint ignore:end */
define([], function () {
    function deg2rad(deg) {
        return deg * (Math.PI / 180);
    }

    var Geolocation = {
        getDistanceFromLatLon: function (latitude1, longitude1, latitude2, longitude2, metric) {
            var lat1 = parseFloat(latitude1, 10), lon1 = parseFloat(longitude1, 10), lat2 = parseFloat(latitude2, 10), lon2 = parseFloat(longitude2, 10);
            var R = 6371; // Radius of the earth in km
            var dLat = deg2rad(lat2 - lat1);
            var dLon = deg2rad(lon2 - lon1);
            var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
            var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            return R * c / (metric ? 1 : 1.609344);
        }
    };

    return Geolocation;
});
