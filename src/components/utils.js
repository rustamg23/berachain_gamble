import zero from '../img/0.png';
import one from '../img/1.png';
import two from '../img/2.png';
import three from '../img/3.png';
import four from '../img/4.png';
import five from '../img/5.png';
import six from '../img/6.png';

import bondbera from "./beras/bondbera.webp"
import bandbera from "./beras/bandbera.webp"
import bongbera from "./beras/bongbera.webp" 
import babybera from "./beras/babybera.webp"
import boobera from "./beras/boobera.webp"
import hungrybera from "./beras/hungrybera.webp"
import remilio from "./beras/remilio.webp" 
import yeetbera from "./beras/yeetbera.webp" 
import bitbera from "./beras/bitbear.webp" 

import beargain_ from "../img/beargain.png"
import beraflip_ from "../img/beraflip.png"
import slots_ from "../img/slots.png"

import { useState, useEffect } from 'react';

export const beargain = beargain_
export const beraflip = beraflip_
export const slots = slots_

export const multiplierTable = {
    '0,0,0': 100,
    '1,1,1': 45,
    '2,2,2': 20,
    '2,2,1': 20,
    '3,3,3': 12,
    '3,3,1': 12,
    '4,4,4': 10,
    '4,4,1': 10,
    '5,5,5': 5,
    '5,5,-': 3,
    '5,x,~': 2
  };
  
  export const breel = {
    '0': bitbera, 
    '1': bandbera,
    '2': bongbera, 
    '3': babybera, 
    '4': yeetbera, 
    '5': hungrybera,
    '6':remilio
  }

export function calculateMultiplier(combination) {
    const combinationKey = combination.join(',');
    if (multiplierTable.hasOwnProperty(combinationKey)) {
      return multiplierTable[combinationKey];
    } else if (combination[0] === 5 && combination[1] === 5) {
      return 3;
    } else if (combination[0] === 5) {
      return 2;
    }
    return 0;
  }


export const reels = [
    [zero, one, two, three, four, five, six],
    [zero, one, two, three, four, five, six],
    [zero, one, two, three, four, five, six],
  ];

export const breels = [
    [bitbera, bandbera, bongbera, babybera, yeetbera, hungrybera, remilio],
    [bitbera, bandbera, bongbera, babybera, yeetbera, hungrybera, remilio],
    [bitbera, bandbera, bongbera, babybera, yeetbera, hungrybera, remilio],
  ]

export const multiplyImages = (images, times) => {
    let result = [];
    for (let i = 0; i < times; i++) {
      result = result.concat(images);
    }
    return result;
  };
  
export function shuffleArray(origin) {
    var array = [...origin]
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }