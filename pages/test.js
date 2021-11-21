import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { OPEN_MODAL } from "../config/baseReducers/modalReducer";

const test = () => {
  const solution = (message, K) => {
    let terms = message.split(" ");

    let finalString = "";
    for (const term of terms) {
      let capSpace = K - finalString.length;

      if (term.length <= capSpace) {
        finalString = finalString + " " + term;
      } else {
        break;
      }
    }
    console.log("Final string", finalString.trim());
    return finalString.trim();
  };

  // solution("Codility We test coders", 14);
  // solution("Why not", 100);
  // solution("The quick brown fox jumps over the lazy dog", 39);
  // solution("To crop or not to crop", 21);

  const popBiggestCar = (carsLeft, peopleLeft) => {
    console.log(
      "Fill the biggest suitable car for",
      peopleLeft,
      "from",
      carsLeft
    );

    const indexBiggestCar = carsLeft.findIndex((c) => c >= peopleLeft);
    console.log("index of biggest car", indexBiggestCar);
    // return carsLeft.find((c) => c >= peopleLeft);
  };

  const cars = (P, S) => {
    let remainingPeople = P.reduce((prev, cur) => prev + cur, 0);

    let sortedCars = S.sort((a, b) => b - a);

    let unusedCards = sortedCars;
    let carsRequired = 0;

    do {
      let nextCar = unusedCards.shift();
      console.log("fill ", nextCar, "leaving", unusedCards);
      remainingPeople = remainingPeople - nextCar;

      carsRequired++;
    } while (remainingPeople > 0);

    return carsRequired;
    //console.log("filling car", nextCar);
    //see if find one that fits all
    // let bigEnoughCar = sortedCars.find((c) => c >= totalPeople);
    // if (bigEnoughCar) {
    //   console.log("Found Big enough car");
    //   return bigEnoughCar;
    // } else {
    //   console.log("Didnt find a car");

    // }
  };

  // cars([1, 4, 1], [1, 5, 1]);

  // cars([1, 4, 1], [1, 6, 1]);

  // cars([4, 4, 2, 4], [5, 5, 2, 5]);

  // cars([2, 3, 4, 2], [2, 5, 7, 2]);

  const industrial = (A) => {
    let totalEmissions = A.reduce(
      (prev, cur) => parseInt(prev) + parseInt(cur),
      0
    );
    let minEmissionsToRemove = totalEmissions / 2;
    console.log("minEmissionsToRemove", minEmissionsToRemove);

    //apply filter to largest remaining factory ..which is at front
    let totalEmissionsReduced = 0;
    let filtersApplied = 0;
    do {
      filtersApplied++;
      let sortedFactories = A.sort((a, b) => b - a);

      let biggestItem = A.shift();

      let halfOfBiggestITem = biggestItem / 2;
      totalEmissionsReduced = totalEmissionsReduced + halfOfBiggestITem;

      A.unshift(halfOfBiggestITem);
      console.log("new A", A);
      A.sort((a, b) => b - a);
      console.log("A resorted", A);
    } while (totalEmissionsReduced < minEmissionsToRemove);
  };

  //factories N
  //filters f
  //polution p
  //companies wnat to reduce total fumes fumesTotal
  let nFilters = 0;
  let fumesTotal = 0;
  //each filter reduces polution of factory by half
  //add another filter, reduce remaining pollution after the last filter

  //key is apply filters to each factory in size

  industrial([100000, 0]);
  return <div className='test-container'>Practice Test containedArea</div>;
};

export default test;
