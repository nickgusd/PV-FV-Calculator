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