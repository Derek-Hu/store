import { Service } from '../constant';
import fetchJSON from './fetchJSON';

Object.keys(Service).forEach(async (lib)=>{
  await fetchJSON(lib.url, lib.name);
})
