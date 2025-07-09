import { app } from "../../scripts/app.js";
import { api } from "../../scripts/api.js";

import  * as advancedUtils from "./utils/advanced_utils.js" 

async function refresh_outputs(node) {

    const file_path = node.widgets[0].value.trim()
    
    if(file_path.length == 0)
    {
        return
    }
    const csvData = await advancedUtils.requestFile(file_path)
        
    node.outputs = []

    for(let field of csvData.fieldnames) {
        const output = node.addOutput(field , "STRING")
        output.type = "STRING"
    }

    app.extensionManager.toast.add({
        severity : "success" , 
		summary : "csv file loader" , 
		detail : "outputs updated with succes" , 
		life : 5000
    })

} 

app.registerExtension({
    name: "csv_utils.LoadCSVFileAdvanced", 

    async setup() {
    } ,

    async beforeRegisterNodeDef(nodeType, nodeData, app) {
        
    } ,

    async nodeCreated(node) {
        if(node.comfyClass == "LoadCSVFileAdvanced") {
            
            node.outputs = []
            refresh_outputs(node)
            
            node.addWidget("button" , "refresh" , 0 , ()=> {
                refresh_outputs(node)
            })
           
        }
    }

})