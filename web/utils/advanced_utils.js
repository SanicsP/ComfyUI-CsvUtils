import { api } from "../../../scripts/api.js";
import { app } from "../../../scripts/app.js";

export async function requestFile(file_path) {    
    try {
        const response = await api.fetchApi("/csv_utils/get_file" , {
            method : "POST" , 
			headers : {"Content-Type" : "application/json"} , 
			body : JSON.stringify({
                file_path : file_path
			})
        })

        if (response.status === 404)
        {
            throw new Error("File not found")
        }
        else if(response.status != 200)
        {
            throw new Error("Error occured while requesting the csv file")
        }

        const json_data = await response.json() 
        
        addId(json_data)
        
        return json_data
    }
    catch(err) {
        app.extensionManager.toast.add({
				severity : "error" , 
				summary : "error occured" , 
				detail : err , 
				life : 5000
		})

    }
}

export function addId(csv_data)  {
    for(let i = 0 ; i < csv_data.rows.length ; i++)
    {
        csv_data.rows[i].id = i
    }
}

export async function filterResults(csvData , query) {
    
    if(query.trim().length == 0)
    {
        return csvData.rows
    }
    
    let miniSearch = new MiniSearch( {
        fields : csvData.fieldnames , 
        storeFields : csvData.fieldnames
    })

    await miniSearch.addAllAsync(csvData.rows)

    const suggest = miniSearch.autoSuggest(query)[0]?.suggestion
    
    let result = null

    if(suggest) {
        result = miniSearch.search(suggest)
        return result
    }
    else {
        result = miniSearch.search(query)
        return result
    }

}