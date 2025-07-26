import { app } from "../../scripts/app.js";
import { api } from "../../scripts/api.js";

import * as xmlWidget from "./utils/widgets/xml_widget.js"

xmlWidget.applyStyle()

app.registerExtension({
    name: "csv_utils.xml_composer", 

    async setup() {
       
    } ,

    async beforeRegisterNodeDef(nodeType, nodeData, app) {
        if(nodeType.comfyClass == "XMLPromptComposer") {
           
            const onNodeCreated = nodeType.prototype.onNodeCreated

            nodeType.prototype.onNodeCreated = function(...args) {
                const r = onNodeCreated?.apply(this , args)

                const node = this

                //node.addDOMWidget("xml-tags" , "STRING" , xmlWidget.createWidget())
            }
        
        }
    } ,

    async nodeCreated(node) {
        if(node.comfyClass == "XMLPromptComposer") {
           
           
        }
    }

})