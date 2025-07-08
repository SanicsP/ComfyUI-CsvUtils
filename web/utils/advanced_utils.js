import { api } from "../../../scripts/api.js";

export async function requestFile(file_path) {    
    try {
        const response = await api.fetchApi("/csv_utils/get_file" , {
            method : "POST" , 
			headers : {"Content-Type" : "application/json"} , 
			body : JSON.stringify({
                file_path : file_path
			})
        })

        if(response.status != 200)
        {
            throw new Error("Error occured while requesting the csv file")
        }

        const json_data = await response.json() 
        addId(json_data)
        return json_data
    }
    catch(err) {
        console.log(err)
    }
}

export function addId(csv_data)  {
    for(let i = 0 ; i < csv_data.rows.length ; i++)
    {
        csv_data.rows[i].id = i
    }
}