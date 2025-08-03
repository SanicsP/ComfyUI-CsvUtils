import { app } from "../../scripts/app.js";
import { api } from "../../../scripts/api.js";
import { requestFile } from "./utils/advanced_utils.js";


async function updateInputs(node , fileWidget) {

    const csvData = await requestFile(fileWidget.value)
                
    node.inputs = []

    for(let fieldname of csvData.fieldnames) {
        
        node.addInput(fieldname , "STRING")
    }

}

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

            const fileWidget = node.widgets.find(w=> w.name == "file_path")

            node.addWidget("button" , "refresh" , 0 ,  ()=> updateInputs(node , fileWidget))

            fileWidget.callback = ()=>updateInputs(node , fileWidget)

        }
    }

})