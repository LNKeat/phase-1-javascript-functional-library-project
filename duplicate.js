const fi = (function() {
  return {
    libraryMethod: function() {
      return 'Start by reading https://medium.com/javascript-scene/master-the-javascript-interview-what-is-functional-programming-7f218c68b3a0'
    },


    /*  
   can condense using Object.Values so less redundant
    */
    each: function(obj, cb) {
      let newObj;

      if(Array.isArray(obj)){
        newObj = [...obj] 
        for(let ele of newObj){
          let ind = newObj.indexOf(ele)
          cb(ele, ind, newObj)
        }
        
      }else {
        newObj = Object.assign({}, obj) 
        for(let key in newObj){
          let val = newObj[key];
          cb(val, key, newObj)
        }
      }
      return obj
    },

    //cb(val, ind/key, obj)
    map: function(obj, cb) {
      const newObj = Array.isArray(obj) ? obj.map((ele, ind) => cb(ele, ind, obj)) : Object.values(obj).map((ele, ind) => cb(ele, ind, obj))

      return newObj
    },

    
    reduce: function(obj, cb, acc) {
      let count = acc
      let i = 0
      if(!acc){
        i = 1
        count = obj[0]
      }
      for(i; i < obj.length; i++){
        let ele = obj[i]
        count = cb(count, ele, obj)
      }
      return count
    },

    find: function(obj, toFind) {
      let valsArray;
      Array.isArray(obj) ? valsArray = obj : valsArray = Object.values(obj);
      
      for(let ele of valsArray){
        if(toFind(ele)){
          let value = ele
          return value
        }
      }
      return undefined
    },

    filter: function (obj, toFilter){
      let valsArray;
      let finalArr = []
      Array.isArray(obj) ? valsArray = obj : valsArray = Object.values(obj);
      
      for(let ele of valsArray){
        if(toFilter(ele)){
          finalArr.push(ele)
        }
      }
      return finalArr
    },

    size: function (collection){
      let array = collection;
      if(!Array.isArray(collection)){array = Object.keys(collection)}
      return array.length
    }, 

    first: function(collection, num){
      let newArr = []
      if(!num){return collection[0]}else{
        for(let i = 0; i < num; i++){
          newArr.push(collection[i])
        }
      }
      return newArr
    },

    last: function(collection, num){
      let ind = collection.length - num
      if(!num){return collection[collection.length - 1]}else{
        return collection.slice(ind)
        }
    },

    compact: function(arr){
      let falsey = [false, null, 0, "", undefined, NaN]
      let filtered = [];
      for(let ele of arr){
        if(!falsey.includes(ele)) filtered.push(ele);
      }
      return filtered
    },

    sortBy: function(arr, cb){
      let sortedArr = arr.slice(0)
      sortedArr.sort((ele1, ele2)=> {
        return cb(ele1) - cb(ele2)
      })
      return sortedArr
    },
    
    flatten: function(arr, stop){
      let finish;
      
      if(!stop) {
        finish = arr.flat(Infinity)
      }else{
        finish = arr.flat()
      }
      return finish
    },

    uniqSorted: function(arr){
      let sorted = [arr[0]]
        for(let i = 1; i < arr.length; i++){
          let ele = sorted[sorted.length - 1]
          if (ele !== arr[i]){ 
            sorted.push(arr[i])
          }
        }
      return sorted
    },

    uniq: function(arr, isSorted, cb){
      if(!cb){
        return lauraFxn(arr, isSorted)
      }else{
        let arrSorted = lauraFxn(arr, isSorted);
        let calledSorted = []
        for(let ele of arrSorted){
          calledSorted.push(cb(ele))
        }
        let num = lauraFxn(calledSorted, isSorted).length
        return arrSorted.splice(0, num)
       
      }
      function lauraFxn(arr, isSorted){
        let sorted = [arr[0]]
        if(isSorted === true){
          return fi.uniqSorted(arr)
        }else{
          for(let i = 1; i < arr.length; i++){
            let ele = arr[i]
            if(!sorted.includes(ele)){
              sorted.push(ele)
            }
          }
        return sorted
      }
      }
    },

    keys: function(obj){
      let keys = []
      for(let key in obj){
        keys.push(key)
      }
      return keys
    },

    values: function(obj){
      let vals = []
      for(let key in obj){
        vals.push(obj[key])
      }
      return vals
    },

    functions: function(obj){
      let keyValArr = Object.entries(obj)
      let keys = []
      for(let ele of keyValArr){
        if(typeof ele[1] === 'function'){
          keys.push(ele[0])
        }
      }
      return keys.sort()
    }
   
  }
})()

fi.libraryMethod()
