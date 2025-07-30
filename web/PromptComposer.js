import { app } from "../../scripts/app.js";
import { api } from "../../scripts/api.js";



app.registerExtension({
    name: "csv_utils.prompt_composer", 

    async setup() {
       
    } ,

    async beforeRegisterNodeDef(nodeType, nodeData, app) {
        if(nodeType.comfyClass == "PromptComposer") {
           
            const onNodeCreated = nodeType.prototype.onNodeCreated

            nodeType.prototype.onNodeCreated = function(...args) {
                const r = onNodeCreated?.apply(this , args)

                const node = this

                
                const addButton = node.addWidget("button" , "add" , 0 , null)

                const removeButton = node.addWidget("button" , "remove" , 0 , null)

                
                const root = document.createElement("div")
                root.style = `
                    display : flex;
                    align-items : center;
                    
                `


                const p = document.createElement("p")
                
                p.style = `
                    height:100%;  
                    width : 100%;
                    display:flex; 
                    background-color : hsl(238, 0%, 14%); 
                    color : hsla(0, 0%, 87%, 1.00);
                    overflow-y :auto;
                    padding : 2px;
                    font-family : "Trebuchet MS" ,sans-serif;
                    font-size : 0.8em;
                `

                root.appendChild(p)

                this.addDOMWidget("result" , "STRING" , root)

                addButton.callback = function() {
                    node.addInput(`seq${node.inputs.length}` , "STRING")
                }

                removeButton.callback = function() {
                    node.removeInput(node.inputs.length-1)
                }


                
                
            }

            const onExecuted = nodeType.prototype.onExecuted 
            
            nodeType.prototype.onExecuted = function(msg) {
                
                
                const r = onExecuted?.apply(this , arguments)
                
                const resultText = msg.text[0]
                console.log("node executed : " , resultText)
                
                const resultP = this.widgets[this.widgets.length-1].element.firstChild

                resultP.innerText = resultText

                return r
            }
        
        }
    } ,

    async nodeCreated(node) {
        if(node.comfyClass == "PromptComposer") {
           
           
        }
    }

})