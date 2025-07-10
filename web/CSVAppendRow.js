import { app } from "../../scripts/app.js";
import { api } from "../../../scripts/api.js";
import { requestFile } from "./utils/advanced_utils.js";

app.registerExtension({
    name: "csv_utils.CSVAppendRow", 

    async setup() {
        
    } ,

    async beforeRegisterNodeDef(nodeType, nodeData, app) {
        if(nodeType.comfyClass == "CSVAppendRow") {
           
        }
    } ,

    async nodeCreated(node) {
        if(node.comfyClass == "CSVAppendRow") {

            const file_widget = node.widgets[0]
            node.addWidget("button" , "refresh" , 0 , async ()=> {
                let csv_data = await requestFile(file_widget.value)
                console.log("[csv utils] : fieldnames " , csv_data.fieldnames)
                
                console.log(node.inputs)
                
                node.inputs = []

                console.log(node.inputs)


                for(let fieldname of csv_data.fieldnames) {
                    
                    node.addInput(fieldname , "string")
                }
            })
        }
    }

})