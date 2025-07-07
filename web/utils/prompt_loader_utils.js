import { api } from "../../../../scripts/api.js";

export async function get_file_content(file_path) {
    try {

        const response = await api.fetchApi("/csv_utils/get_prompts" , {
            method : "POST" , 
			headers : {"Content-Type" : "application/json"} , 
			body : JSON.stringify({
                file_path : file_path
			})
        })

        if(response.status != "200") {
            throw new Error("error while requesting csv file content")
        }

        const json_data = await response.json()
        
        return json_data.prompt_list

    }
    catch(err) {
        console.log(err)
        return []
    }


}