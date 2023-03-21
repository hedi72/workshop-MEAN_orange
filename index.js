const datasource = require("./datasource.json");
function toRad(x) {
  return (x * Math.PI) / 180;
}
/* 
This function calculate the distance 
@param coords1 this is an array that ...
@return return the 

*/
function haversineDistance(coords1, coords2, isMiles) {
  var lon1 = coords1[0];
  var lat1 = coords1[1];

  var lon2 = coords2[0];
  var lat2 = coords2[1];

  var R = 6371; // km

  var x1 = lat2 - lat1;
  var dLat = toRad(x1);
  var x2 = lon2 - lon1;
  var dLon = toRad(x2);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c;

  if (isMiles) d /= 1.60934;

  return d;
}

const sortedEvent = datasource.events
  .filter((ev) => {
    return ev.isVisble == true;
  })
  .map((item) => {
    let newEvent = item;
    newEvent.distance = haversineDistance(
      [10.079602, 35.675067],
      [item.lat, item.long],
      false
    );
    return newEvent;
  })
  .sort((event1, event2) => {
    return event1.distance - event2.distance;
  });
console.log(sortedEvent);
