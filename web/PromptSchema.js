import { app } from "../../scripts/app.js";
import { api } from "../../scripts/api.js";



app.registerExtension({
    name: "csv_utils.prompt_schema", 

    async setup() {
       
    } ,

    async beforeRegisterNodeDef(nodeType, nodeData, app) {
        if(nodeType.comfyClass == "PromptSchema") {
           
            const onNodeCreated = nodeType.prototype.onNodeCreated

            nodeType.prototype.onNodeCreated = function(...args) {
                const r = onNodeCreated?.apply(this , args)

                const node = this

                const refreshButton = node.addWidget("button" , "refresh" , 0 , null )
                
                const schemaTextArea = node.widgets[0].element

                
                refreshButton.callback = (e)=> {
                    
                    const schema = schemaTextArea.value
                    
                    const regex = /\[([A-Za-z0-9_-]+)\]/g


                    let replacements = Array.from(schema.matchAll(regex)).map((res)=>{
                        const regexResults = Array.from(res)[1]
                        console.log(regexResults)
                        return regexResults
                    })

                   node.inputs = []
                   
                   replacements.forEach((key)=>{
                    node.addInput(key , "STRING")
                   })
                }

                
            }

        }
    } ,


})