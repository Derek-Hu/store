import { Service } from '../constant';
import fetchJSON from './fetchJSON';

async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array)
  }
}

asyncForEach(Object.keys(Service), async lib => {
  await fetchJSON(lib.url, lib.name);
});