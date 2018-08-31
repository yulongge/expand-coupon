/**
 * type: wgs84(GPS 坐标) || gcj02(国测局坐标)
 */
const {compareDistance} = require('../app_requests');

const wxGetLocation = function () {
  return new Promise(function (resolve, reject) {
    wx.getLocation({
      type: 'wgs84', 
      success: function(res) {
        const {latitude, longitude} = res;
        resolve({
          latitude,
          longitude
        })
      },
      fail: function () {
        resolve({
          latitude: null,
          longitude: null
        })
      }
    })
  })
}

const compareDistanceReq = function (parmas) {
  return new Promise(function (resolve, reject) {
    compareDistance(parmas, res => {
      resolve(res);
    })
  })
}

const openSetting = function() {
  return new Promise(function (resolve, reject) {
    wx.openSetting({
      success: (res) => {
        console.log(res, 'setting');
        resolve(res);
        /*
         * res.authSetting = {
         *   "scope.userInfo": true,
         *   "scope.userLocation": true
         * }
         */
      },
      fail: function (res) {
        reject(res)
      }
    })
  })
}

const compareUserLocation = function (parmas) {
  return new Promise(function (resolve, reject) {
    const {lat, lng, distance} = parmas;
    if (lat && lng && distance && distance && distance > 0 && lat > 0 && lng > 0) {
      wxGetLocation().then(result => {
        const {latitude, longitude} = result;
        if (latitude && longitude) {
          compareDistanceReq({
            lat: latitude,
            lng: longitude,
            slat: lat,
            slng: lng,
          }).then(function(res) {
            if (res.distance && res.distance > distance) {
              reject(1);
            } else {
              resolve();
            }
          })
        } else {
          reject(2);
        }
      })
    } else {
      resolve();
    }
  })
}

module.exports = {
  wxGetLocation,
  compareDistanceReq,
  compareUserLocation,
  openSetting
}