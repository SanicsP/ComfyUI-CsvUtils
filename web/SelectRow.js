import { app } from "../../scripts/app.js";
import { api } from "../../scripts/api.js";



app.registerExtension({
    name: "csv_utils.SelectRow", 

    async setup() {
       
    } ,

    async beforeRegisterNodeDef(nodeType, nodeData, app) {
        if(nodeType.comfyClass == "SelectRow") {
            
        
        }
    } ,



})