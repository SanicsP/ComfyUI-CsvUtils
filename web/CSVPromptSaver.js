import { app } from "../../scripts/app.js";
import { api } from "../../../scripts/api.js";






function make_submenu(value, options, e, menu, node) {
    
	console.log(node.widgets[1].value)
	
	const submenu = new LiteGraph.ContextMenu(
        ["option 1", "option 2", "option 3"],
        { 
            event: e, 
            callback: function (v) { 
                // do something with v (=="option x")
            }, 
            parentMenu: menu, 
            node:node
        }
    )
}


async function fetchPrompt(file_path , positive_prompt , negative_prompt) {
	try {

		const response = await api.fetchApi("/csv_utils/save_prompt" , {
			method : "POST" , 
			
			body : JSON.stringify({
				
				positive_prompt : positive_prompt ,

				negative_prompt : negative_prompt,
				
				file_path : file_path
			})

			, headers : {
				"Content-Type" : "application/json"
			}
		})
		
		if(response.status != 200) {
			throw new Error("error while saving prompt")
		}

		const data = await response.json()

		console.log("[CSV utils] server response : " , data.message)

		if(!data.status)
		{
			app.extensionManager.toast.add({
				severity : "error" , 
				summary : "csv prompt saver Error" , 
				detail : data.message , 
				life : 5000
			})
			//alert("Error :" + data.message)
		}
		else {
			app.extensionManager.toast.add({
				severity : "success" , 
				summary : "csv prompt saver success" , 
				detail : data.message , 
				life : 5000
			})
		}

	}
	catch(error) {
		app.extensionManager.toast.add({
				severity : "error" , 
				summary : "Internal Error" , 
				detail : error , 
				life : 5000
			})
	}
}


app.registerExtension({ 
	name: "CSVPromptSaver",
	
	async beforeRegisterNodeDef(nodeType, nodeData, app) {
		
		
		if(nodeType.comfyClass=="CSVPromptSave") {	
			const original_getExtraMenuOptions = nodeType.prototype.getExtraMenuOptions;
		
		}
	} ,

	async setup() { 
		console.log("[CSV tools] extension setup complete")
	},

	async nodeCreated(node) {
	
		if(node.comfyClass == "CSVPromptSave") 
		{	
			
			console.log(node.getInputData(1))
			node.addWidget("button" , "save prompt" , 0 , async ()=>{


				let file_path_label = node.widgets[0].value
				
				let pos_prompt_label = node.widgets[1].value
				
				let neg_prompt_label = node.widgets[2].value 
				
				fetchPrompt(file_path_label , pos_prompt_label , neg_prompt_label)
				
			})

			

		}
	} , 
	
	async init() {
	} ,

	async setup()
	{
	
	}
})