import { app } from "../../scripts/app.js";
import { api } from "../../../scripts/api.js";
import { create_csv_info_widget } from "./utils/prompt_loader_widgets.js";
import { get_file_content } from "./utils/prompt_loader_utils.js";


app.registerExtension({
    name: "CSVPromptLoader",
    async setup() { 
		console.log("[CSV tools] prompt loader setup complete")
	},
    async beforeRegisterNodeDef(nodeType, nodeData, app) {
		if(nodeType.comfyClass == "CSVPromptLoader") {
            
            const onExecuted = nodeType.prototype.onExecuted

            nodeType.prototype.onExecuted = async function (message) {

                const me = onExecuted?.apply(this, arguments)
                
                console.log("message")
            }}
	} ,
    async nodeCreated(node) {
        if(node.comfyClass == "CSVPromptLoader")
        {
            let file_pth_widget = node.widgets[0]
            
            let refresh_button_widget = node.addWidget("button" , "refresh" , 0 , ()=>{})

            let info_div = document.createElement("div")

            info_div.className = "csv-u-info-widget"
            
            let info_widget = node.addDOMWidget("info" , "string" , info_div)
            
            
            refresh_button_widget.callback = async (path)=> {
                
                let prompt_array = await get_file_content(file_pth_widget.value)

                const row_count = prompt_array.length

                info_div.innerHTML = create_csv_info_widget({
                    count : row_count
                })

                //console.log("[csv utils] loaded list : " , prompt_array)
            }
            
        }
    }

})