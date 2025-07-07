import { app } from "../../scripts/app.js";
import { api } from "../../../scripts/api.js";


async function getPromptList(file_path) {
	
	try {

		const response = await api.fetchApi("/csv_utils/get_prompts" , {
			method : "POST" , 
			headers : {"Content-Type" : "application/json"} , 
			body : JSON.stringify({
				file_path : file_path
			})
		})
		
		if(response.status != 200) {
			throw new Error("error while searching querying prompts")
		}

		const data = await response.json()
		// console.log(data.prompt_list)
		return data.prompt_list
		
	}
	catch(err) {
		app.extensionManager.toast.add({
				severity : "error" , 
				summary : "Internal Error" , 
				detail : err , 
				life : 5000
			})
		return []
	}


}


function create_prompt_div(pos , neg , search) 
{
	
	return ` 
		<div class="csv-u-prompt-container">
			<p class="csv-u-prompt-span csv-u-pos-span csv-u-p"> 
				${pos}\t
			</p>
			<div class="csv-u-delimiter"></div>
			<p class="csv-u-prompt-span csv-u-neg-span csv-u-p">
				${neg}
			</p>
		</div>
	`
}


function filter_data(prompt_list , search) {
	
	if(search.trim().length == 0)
	{
		return prompt_list
	}	

	let minisearch = new MiniSearch(
		{
			idField : "id" ,
			fields : ["positive" , "negative"] , 
			storeFields : ["positive" , "negative"] ,
			fuzzy : 0.2 , 
			//combineWith : "AND"
		}
	)

	minisearch.addAll(prompt_list)

	const suggest = minisearch.autoSuggest(search)[0]?.suggestion
	
	
	let query = search
	
	if(suggest)
		query = suggest
	
	const results = minisearch.search(query)

	//console.log("search suggestion :" , suggest , "results : " , results.length)

	return results
}



function createResultWidget() {
	
	let result_container = document.createElement("div")
		result_container.style.overflow = "clip"
		result_container.style.display = "flex"
		result_container.style.flexDirection = "column"
		result_container.className = "csv-u-result-container"

		// result_container.style.height = "100%"
		// let header = document.createElement("h3")
		// 	result_container.appendChild(header)
		// 	header.innerText = "Search List" 
		// 	header.className = "csv-u-header"
			
		let search_bar = document.createElement("input")
			search_bar.type = "text"
			search_bar.className = "csv-u-search-bar"
			search_bar.placeholder = "search your prompt..."
			result_container.appendChild(search_bar)
		
		let result_list = document.createElement("div")
			result_list.style.overflowY = "auto"
			result_list.style.overflowX = "hidden"


			result_list.style.height = "100%"
			result_container.appendChild(result_list)

		let prompt_list = document.createElement("div")
			result_list.appendChild(prompt_list)
			prompt_list.className = "csv-u-prompt-list"
		
	return {result_container : result_container,  result_list : result_list , search_bar : search_bar}
}


//----------------------------------------------------------------------------------------------



app.registerExtension({ 
	name: "CSV-UTILS-SEARCH",
	
	async init() {
		let style = document.createElement("style") 
		
		style.innerHTML = `
				.csv-u-highlight {
					background-color : rgb(47, 49, 51);
					border-radius : 2px;
					padding : 1px;
				}

				.csv-u-header {
					text-align : center;
				}

				.csv-u-prompt-span {
					padding : 4px;
					cursor : pointer;
					flex-grow : 0.5;
					width : 50%;
					font-size : x-small;
					color : black;
					font-family : sans-serif;
					
				}
				.csv-u-prompt-span:hover {
					cursor : url("clipboard.svg");
				}

				.csv-u-pos-span:hover {
					color : rgb(118, 199, 60);
				}

				.csv-u-neg-span:hover {
					color : rgb(199, 52, 57);
				}

				
				.csv-u-prompt-container {
					display : flex;
					border-radius : 6px;
					padding : 2px;
					margin-top : 2px;
					margin-bottom : 2px;
					gap : 2px;
				}

				.csv-u-search-bar {
					width : 85%;
					border : none;
					margin-bottom : 12px;
					margin-top : 6px;

					background-color : white;
					border-radius : 4px;
					color : black;
				}

				.csv-u-result-container {
					background-color : hsl(0 0% 12.4%);
					padding : 4px;
					border-radius : 8px;
					align-items : center;
				}
				.csv-u-p {
					color : rgb(204 204 204);
					/*box-shadow: 1px 3px 5px rgba(0, 0, 0, 0.42);*/
					border-radius : 4px;
					font-family : sans-serif;
				}
				.csv-u-p:hover {
					transform : scale(1.02);
					transition: all 0.02s ease-out;
				}
				
				.csv-u-br {
					background-color : white;
					color : white;
					height : 2px;
				}

				.csv-u-delimiter {
					width : 2px;
					background-color: white;
				}
		`
		document.body.appendChild(style)
	},

	async beforeRegisterNodeDef(nodeType, nodeData, app) {
		
		
	} ,

	async setup() { 
		console.log("[CSV tools] Extension setup complete")
	},

	async nodeCreated(node) {
	
		if(node.comfyClass == "CSVPromptSearch") 
		{	
			
			let result_widgets = createResultWidget()
			
			node.addDOMWidget("list-results" , "list" , result_widgets.result_container)

			let search_bar_widget = result_widgets.search_bar

			
			search_bar_widget.addEventListener("input" , async (e)=> {
				
				const file_path = node.widgets[0].value

				const prompt_list = await getPromptList(file_path)
				
				const filtered_list = filter_data(prompt_list , search_bar_widget.value)
				
				result_widgets.result_list.innerHTML = ""

				for( let i = 0 ; i < filtered_list.length ; i++) {

					let div = document.createElement("div")
					
					div.innerHTML = create_prompt_div(filtered_list[i].positive , filtered_list[i].negative , search_bar_widget.value)
					
					result_widgets.result_list.appendChild(div)

					let br = document.createElement("div")
					br.className = "csv-u-br"
					
					result_widgets.result_list.appendChild(br)
				}

				const span_list = Array.from(document.getElementsByClassName("csv-u-prompt-span"))
				
				span_list.forEach(element => {
					element.addEventListener("click" , (e)=> {
							navigator.clipboard.writeText(e.target.innerText)
							app.extensionManager.toast.add({
							severity : "success" , 
							summary : "prompt search" , 
							detail : "Prompt copied !" , 
							life : 2000
						})
					}) 	
				});

			})
			
		}
	} , 
	

	
	
})