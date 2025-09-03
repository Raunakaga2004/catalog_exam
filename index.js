const data1 ={
    "keys": {
        "n": 4,
        "k": 3
    },
    "1": {
        "base": "10",
        "value": "4"
    },
    "2": {
        "base": "2",
        "value": "111"
    },
    "3": {
        "base": "10",
        "value": "12"
    },
    "6": {
        "base": "4",
        "value": "213"
    },
    "7" : {
      "base" : "10",
      "value" : "39"
    }
}

const data2 = {
"keys": {
    "n": 10,
    "k": 7
  },
  "1": {
    "base": "6",
    "value": "13444211440455345511"
  },
  "2": {
    "base": "15",
    "value": "aed7015a346d635"
  },
  "3": {
    "base": "15",
    "value": "6aeeb69631c227c"
  },
  "4": {
    "base": "16",
    "value": "e1b5e05623d881f"
  },
  "5": {
    "base": "8",
    "value": "316034514573652620673"
  },
  "6": {
    "base": "3",
    "value": "2122212201122002221120200210011020220200"
  },
  "7": {
    "base": "3",
    "value": "20120221122211000100210021102001201112121"
  },
  "8": {
    "base": "6",
    "value": "20220554335330240002224253"
  },
  "9": {
    "base": "12",
    "value": "45153788322a1255483"
  },
  "10": {
    "base": "7",
    "value": "1101613130313526312514143"
  }
}

function findCoefficient(data){
  // Step 1: Extract roots (convert to decimal) into a Set
  const rootSet = new Set();
  for (let key in data) {
      if (key === "keys") continue;
      const base = parseInt(data[key].base, 10);
      const value = data[key].value;
      const decimal = parseInt(value, base);
      rootSet.add(decimal); // duplicates auto-removed
  }

  // Convert Set → Array for combinations
  const roots = Array.from(rootSet);
  // console.log("Unique Roots:", roots);

  // Step 2: m = k - 1
  const k = data.keys.k;
  const m = k - 1;

  // Helper: generate combinations of size m
  function combinations(arr, m) {
      if (m === 0) return [[]];
      if (arr.length < m) return [];
      const [first, ...rest] = arr;
      const withFirst = combinations(rest, m - 1).map(c => [first, ...c]);
      const withoutFirst = combinations(rest, m);
      return withFirst.concat(withoutFirst);
  }

  // Step 3: Compute constants
  const combos = combinations(roots, m);
  const constants = new Set();

  combos.forEach(combo => {
      const product = combo.reduce((a, b) => a * b, 1);
      const constant = (m % 2 === 0 ? 1 : -1) * product; // (-1)^m * product
      constants.add(constant);
  });

  // Print unique constants
  constants.forEach(element => {
    console.log(element)
  });
  // console.log([...constants]);
}

findCoefficient(data1);
findCoefficient(data2);
