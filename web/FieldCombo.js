import { app } from "../../scripts/app.js";
import { api } from "../../scripts/api.js";
import { requestFile } from "./utils/advanced_utils.js";


function getLinkId() {
    const input = this.inputs[0]
    const link_id = input.link
    return link_id
}
app.registerExtension({
    name: "csv_utils.field_combo", 

    async setup() {
       
    } ,

    async beforeRegisterNodeDef(nodeType, nodeData, app) {
        if(nodeType.comfyClass == "SelectDataByField") {
            //console.log(app.graph)

           

            const onNodeCreated = nodeType.prototype.onNodeCreated

            nodeType.prototype.onNodeCreated = function(...args) { 

               const r =  onNodeCreated?.apply(this , arguments)
                console.log(this)
                console.log(nodeData)
                const widget = this.widgets.find(w => w.name == 'field_list')

                console.log(widget)
                this.addWidget("button" , "refresh combo list" , 0 , async ()=> {
                    
                    let currentNode = this
                    let link_id = null

                    while(link_id = getLinkId.call(currentNode))
                    {
                        //console.log("link finded")

                        const LLinkObj = app.graph.links[link_id]
                        
                        const originId = LLinkObj.origin_id

                        const originNode = app.graph._nodes_by_id[originId]

                        //console.log("origin node class : " , originNode.comfyClass)

                        if(originNode.comfyClass == "LoadCSVFile") {
                            try {
                               
                                //console.log("matching ! loadCSVFile node finded")
                               
                                const filePath = originNode.widgets[0].value
                               
                                //console.log("attempt to load csv file : " , filePath)

                                const csvData = await requestFile(filePath)

                                //console.log("file loaded : " , csvData)
                                
                                Object.defineProperty(this.widgets[0].options , "values" , {
                                    get() {
                                        return csvData.fieldnames
                                    }
                                })

                                this.widgets[0].options.values = csvData.fieldnames
                                
                            }
                            catch(err) {
                                
                            }
                            
                        }
                        else {
                            console.log("node no matching")
                        }
                        
                        currentNode = originNode
                    }  
                })
               return r 
            }
        }

        
    } ,



})