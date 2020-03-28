import axios from 'axios';

export const loadStoreData = async () => {
    try{
        const resp = await axios.get('http://ice.alicdn.com/assets/materials/react-materials.json');
        resp.data.blocks.forEach(element => {
            element.__lib__ =  'icework';
        });
        return resp.data;
    }catch(e){
        console.error(e)
        return {};
    }
}