import { app } from "../../scripts/app.js";
import { api } from "../../../scripts/api.js";
import * as SearchComponent from "./utils/widgets/advanced_search_widgets.js";


app.registerExtension({
    name: "csv_utils.CSVAdvancedSearch", 

    async setup() {
        SearchComponent.apply_advanced_search_style()
        console.log("[CSV TOOLS] advanced search setup completed")
    } ,

    async beforeRegisterNodeDef(nodeType, nodeData, app) {
        
    } ,

    async nodeCreated(node) {
        if(node.comfyClass == "CSVAdvancedSearch") {

            const searchComponent = SearchComponent.create_search_component()
            
            node.addDOMWidget("search-results" , 0 , searchComponent.root)

            searchComponent.search_bar.addEventListener("input" , ()=>{
                SearchComponent.onInput(node , searchComponent)
            })
        }
    }

})