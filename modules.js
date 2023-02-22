// const data=require('./people');
const {people,ages}=require('./people');   //destructuring

console.log(people,ages);

const os=require('os');

// console.log(os);

console.log(os.platform(),os.homedir());