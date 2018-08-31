exports.getWxStorageSync = (key) => {
  try {
    let value = wx.getStorageSync(`${key}`);
    if (value) {
      return value;
    }
  } catch (e) {
    console.log(e, 'getWxStorageSync');
  }
}

exports.setWxStorageSync = (key, data) => {
  try {
    wx.setStorageSync(`${key}`, data)
  } catch (e) {    
    console.log(e, 'setWxStorageSync')
  }
}

exports.clearStorageSync = (key) => {
  try {
    wx.removeStorageSync(`${key}`)
  } catch (e) {
    console.log(e, 'clearStorageSync');
  }
}

exports.filterStorageKeys = (key) => {
  try {
    const res = wx.getStorageInfoSync()
    const keys = res.keys;
    const _keys = keys.filter(k => {
      return k.indexOf(key) >= 0;
    })
    return _keys;
  } catch (e) {
    console.log(e, 'clearStorageSync');
  }
}