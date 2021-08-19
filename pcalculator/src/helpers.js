//helpers.js file for common global functions

export const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

export const convertToDecimal = (x) => {
    if (x < 1) {
      return x;
    } else {
      return x / 100;
    }
  };
  
export const toNegative = (num) => {
    if (num < 0) {
      return num;
    } else {
      return num * -1;
    }
  };
   
export const toPositive = (num) => {
    if (num < 0) {
      return num * -1
    } else {
      return num
    }
  };

export const pvTable = (periods, bb, pmt, interest  ) => {

    let count = 1;
    let pvArr = [];
    let interestArr = [];
    let fvArr = [];
    let pmtArr = [];
    let periodArr = [];
    
    while (count <= periods) {
  
    let periodInterest = bb * interest;
    let eb = bb - (-toNegative(pmt) - periodInterest);
    
      if (count === 1) {
        pvArr.push(bb.toFixed(2));
        fvArr.push(toPositive(eb.toFixed(2)));
        interestArr.push(periodInterest.toFixed(2));
      } else {
        bb = eb;
        periodInterest = bb * interest;
        eb = bb - (-toNegative(pmt) - periodInterest);
        fvArr.push(toPositive(eb.toFixed(2)));
        pvArr.push(bb.toFixed(2));
        interestArr.push(periodInterest.toFixed(2));
      }
      pmtArr.push(toNegative(pmt).toFixed(2))
      periodArr.push(count);
      
      count++
  
    }
  
    return (
      {
        Period: periodArr,
        PV: pvArr,
        PMT: pmtArr,
        Interest: interestArr,
        FV: fvArr
      }
    );
  }
  
export const fvTable = (periods, pv, pmt, interest) => {

    let count = 1;
    let pvArr = [];
    let interestArr = [];
    let fvArr = [];
    let pmtArr = [];
    let periodArr = [];

    while (count <= periods) {
  
        let periodInterest = pv * interest;
        let eb = pv + toPositive(pmt) + periodInterest;
        
          if (count === 1) {
            pvArr.push(pv.toFixed(2));
            fvArr.push(toNegative(eb).toFixed(2));
            interestArr.push(periodInterest.toFixed(2));
          } else {
            pv = eb;
            periodInterest = pv * interest;
            eb = pv + toPositive(pmt) + periodInterest;
            fvArr.push(toPositive(eb).toFixed(2));
            pvArr.push(pv.toFixed(2));
            interestArr.push(periodInterest.toFixed(2));
          }
          pmtArr.push(toPositive(pmt).toFixed(2));
          periodArr.push(count);
          
          count++
      
        }

        return (
            {
              Period: periodArr,
              PV: pvArr,
              PMT: pmtArr,
              Interest: interestArr,
              FV: fvArr
            }
          );
  }

 export const conv_number = (expr, decplaces) => {
    var str = "" + Math.round(eval(expr) * Math.pow(10,decplaces));
    while (str.length <= decplaces) {
      str = "0" + str;
    }
  
    var decpoint = str.length - decplaces;
    return (str.substring(0,decpoint) + "." + str.substring(decpoint,str.length));
  }

  export const getPresentValue = (rate, nper, pmt, fv) => {
    let pv_value, x, y;
    rate = parseFloat(rate);
    nper = parseFloat(nper);
    pmt = parseFloat(pmt);
    fv = parseFloat(fv);
    if ( nper == 0 ) {
      alert("Why do you want to test me with zeros?");
      return(0);       
    }
    if ( rate == 0 ) { // Interest rate is 0
      pv_value = -(fv + (pmt * nper));
    } else {
      x = Math.pow(1 + rate, -nper); 
      y = Math.pow(1 + rate, nper);
      pv_value = - ( x * ( fv * rate - pmt + y * pmt )) / rate;
    }
    pv_value = conv_number(pv_value,2);
    return pv_value;
  }

  export const getFutureValue = (rate, nper, pmt, pv) => {
    let fv_value, x, y;
    rate = parseFloat(rate);
    nper = parseFloat(nper);
    pmt = parseFloat(pmt);
    pv = parseFloat(pv);
    if ( nper == 0 ) {
      alert("Why do you want to test me with zeros?");
      return(0);
    }
    if ( rate == 0 ) { // Interest rate is 0
      fv_value = -(pv + (pmt * nper));
    } else {
      x = Math.pow(1 + rate, nper);
      fv_value = - ( -pmt + x * pmt + rate * x * pv ) /rate;
    }
    fv_value = conv_number(fv_value,2);
    return fv_value;
  }

  export const getPmt = (
    rate_per_period,
    number_of_payments,
    present_value,
    future_value,
    type
  ) => {
    future_value = typeof future_value !== "undefined" ? future_value : 0;
    type = typeof type !== "undefined" ? type : 0;

    if (rate_per_period != 0.0) {
      let q = Math.pow(1 + rate_per_period, number_of_payments);
      let answer =
        -(rate_per_period * (future_value + q * present_value)) /
        ((-1 + q) * (1 + rate_per_period * type));
      return numberWithCommas(answer.toFixed(2));
    } else if (number_of_payments != 0.0) {
      let answer = -(future_value + present_value) / number_of_payments;
      return numberWithCommas(answer.toFixed(2));
    }

    return 0;
  };

  export const getRate = (periods, payment, present, future, type, guess) => {
    guess = guess === undefined ? 0.01 : guess;
    future = future === undefined ? 0 : future;
    type = type === undefined ? 0 : type;

    let epsMax = 1e-10;

    let iterMax = 10;

    let y,
      y0,
      y1,
      x0,
      x1 = 0,
      f = 0,
      i = 0;
    let rate = guess;
    if (Math.abs(rate) < epsMax) {
      y =
        present * (1 + periods * rate) +
        payment * (1 + rate * type) * periods +
        future;
    } else {
      f = Math.exp(periods * Math.log(1 + rate));
      y = present * f + payment * (1 / rate + type) * (f - 1) + future;
    }
    y0 = present + payment * periods + future;
    y1 = present * f + payment * (1 / rate + type) * (f - 1) + future;
    i = x0 = 0;
    x1 = rate;
    while (Math.abs(y0 - y1) > epsMax && i < iterMax) {
      rate = (y1 * x0 - y0 * x1) / (y1 - y0);
      x0 = x1;
      x1 = rate;
      if (Math.abs(rate) < epsMax) {
        y =
          present * (1 + periods * rate) +
          payment * (1 + rate * type) * periods +
          future;
      } else {
        f = Math.exp(periods * Math.log(1 + rate));
        y = present * f + payment * (1 / rate + type) * (f - 1) + future;
      }
      y0 = y1;
      y1 = y;
      ++i;
    }
    return rate;
  };

  