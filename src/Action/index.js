const axios = require("axios");

// Get Function for all request
const getRequest=async (url,parameter)=>{
     
    if(parameter!='' && parameter!=undefined){
        url=url + parameter;
    }
    var data =  await axios.get(url)
    .then((res)=>{
        return res.data;
    }).catch((error)=>{
        console.log(error.response);
    });
    return data;
}

// Post Function for all request
 const postRequest = async(url,parameter)=>{
    var data =  await axios.post(url + parameter)
    .then((res)=>{
        return res.data;
    }).catch((error)=>{
        console.log(error.response);
    });
    return data;
}

function toPlainString(num) {
    return (''+ +num).replace(/(-?)(\d*)\.?(\d*)e([+-]\d+)/,
      function(a,b,c,d,e) {
        return e < 0
          ? b + '0.' + Array(1-e-c.length).join(0) + c + d
          : b + c + d + Array(e-d.length+1).join(0);
      });
  }

export {getRequest,postRequest,toPlainString}