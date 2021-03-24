import {FETCH_DATA} from './types';

export const fetchData =(filename)=> dispatch=>{

return function (dispatch){
     const data_response = axios
        .post("http://127.0.0.1:5000/tableData", {
          filename: filename,
        })
        .then(response => dispatch({
	  type: FETCH_DATA,
	  payload:response.data
	  	  });

}

}