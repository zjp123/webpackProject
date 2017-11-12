import myName from './print'
import './publickjs'
import './base.css';
const str = 'I will be  success human! againsss';
console.log(str);
myName();
//用于生产环境还是开发环境的检测
if (process.env.NODE_ENV !== 'production') {
   console.log('Looks like we are in development mode!');
 }
