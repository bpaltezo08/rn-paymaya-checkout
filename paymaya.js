
export const CheckOut = (env, details, callback) => {

  let sdkURL = env == "PRODUCTION" ? "https://pg.paymaya.com/" : "https://pg-sandbox.paymaya.com/"
  let cUrl = sdkURL + "checkout/v1/checkouts"
  let b64 = env == "PRODUCTION" ? Base64.btoa(prod_api_key) : Base64.btoa(sandbox_api_key)
  let token = "Basic " + b64.substr(0, b64.length-1)

  try{
    fetch(cUrl, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': token
      },
      body: JSON.stringify(details)
    }).then(function(res) {
      return res.json()
     })
    .then(function(res) {
      callback(res)
    })
  }catch(e){
    callback(e)
  }

}

export const TotalAmount = (cur, value) => {
  return {
    "currency": cur ? cur : "PHP",
    "value": parseFloat(value).toFixed(2)
  }
}

export const Buyer = (fn, mn, ln, con, email) => {
  return {
    "firstName": fn,
    "middleName": mn,
    "lastName": ln,
    "contact": {
      "phone": con,
      "email": email
    }
  }
}

export const Item = (name, qty, code, desc, amount) => {
  return {
    "name": name,
    "code": code,
    "description": desc,
    "quantity": qty,
    "amount": {
      "value": amount.value
    },
    "totalAmount": amount
  }
}

export const Ref = () => {
  let d = new Date()
  return d.getDate()+''+d.getHours()+''+d.getMinutes()+''+d.getSeconds()+''+d.getMilliseconds()
}

//BASE64 ENCODING MODULE
const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
const Base64 = {
  btoa: (input:string = '')  => {
    let str = input;
    let output = '';

    for (let block = 0, charCode, i = 0, map = chars;
    str.charAt(i | 0) || (map = '=', i % 1);
    output += map.charAt(63 & block >> 8 - i % 1 * 8)) {

      charCode = str.charCodeAt(i += 3/4);

      if (charCode > 0xFF) {
        throw new Error("'btoa' failed: The string to be encoded contains characters outside of the Latin1 range.");
      }

      block = block << 8 | charCode;
    }

    return output;
  },

  atob: (input:string = '') => {
    let str = input.replace(/=+$/, '');
    let output = '';

    if (str.length % 4 == 1) {
      throw new Error("'atob' failed: The string to be decoded is not correctly encoded.");
    }
    for (let bc = 0, bs = 0, buffer, i = 0;
      buffer = str.charAt(i++);

      ~buffer && (bs = bc % 4 ? bs * 64 + buffer : buffer,
        bc++ % 4) ? output += String.fromCharCode(255 & bs >> (-2 * bc & 6)) : 0
    ) {
      buffer = chars.indexOf(buffer);
    }

    return output;
  }
};
