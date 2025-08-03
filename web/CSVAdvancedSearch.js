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
        if(nodeType.comfyClass == "CSVAdvancedSearch") {
            
            const onCreated = nodeType.prototype.onNodeCreated

            nodeType.prototype.onNodeCreated = function(...args) {
                const r = onCreated?.apply(this , args)
                
                const node = this

                const searchComponent = SearchComponent.create_search_component()
                
                const refreshWidget = node.addWidget("button" , "refresh" , 0)
                
                const resWidget = node.addDOMWidget("search-results" , 0 , searchComponent.root)
                
                resWidget.hideOnZoom = true
                
                
                const filePathWidget = node.widgets[0]
                
                filePathWidget.callback = (text)=> {
                    SearchComponent.onInput(node , searchComponent)
                }

                searchComponent.search_bar.addEventListener("input" , ()=>{
                    SearchComponent.onInput(node , searchComponent)
                })

                refreshWidget.callback = () => SearchComponent.onInput(node , searchComponent)

                SearchComponent.onInput(node , searchComponent)

                return r
            }
        }
    } ,

    async nodeCreated(node) {
        if(node.comfyClass == "CSVAdvancedSearch") {


            
            
        }
    }

})