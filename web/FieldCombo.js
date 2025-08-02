import { app } from "../../scripts/app.js";
import { api } from "../../scripts/api.js";
import { requestFile } from "./utils/advanced_utils.js";


function getLinkId() {
    const input = this.inputs[0]
    const link_id = input.link
    return link_id
}

async function refreshList(combo , fieldname) {
    
    let currentNode = this

    let link_id = null

    while(link_id = getLinkId.call(currentNode))
    {
       
        const LLinkObj = app.graph.links[link_id]
        
        const originId = LLinkObj.origin_id

        const originNode = app.graph._nodes_by_id[originId]

        
        if(originNode.comfyClass == "LoadCSVFile") {
            try {
                
                const filePath = originNode.widgets[0].value
                
                const csvData = await requestFile(filePath)

                combo.options.values = csvData.fieldnames
                combo.value = combo.options.values[0]
                fieldname.value = combo.value
                
            }
            catch(err) {
                
            }   
        }
        
        currentNode = originNode
    }  
}

function make_submenu(value, options, e, menu, node) {
    
    const submenu = new LiteGraph.ContextMenu(
        ["refresh combos"],
        { 
            event: e, 
            callback: function (v) { 
                if (v == "refresh combos") {
                    app.graph._nodes.forEach((node)=> {
                        if(node.comfyClass == NODE_CLASS) {
                            node.refreshNode()
                        }
                    })
                }
            }, 
            parentMenu: menu, 
            node:node
        }
    )
    
}

const NODE_CLASS = "SelectDataByField"
app.registerExtension({
    name: "csv_utils.field_combo", 

    async setup() {

       const original_getCanvasMenuOptions = LGraphCanvas.prototype.getCanvasMenuOptions
        LGraphCanvas.prototype.getCanvasMenuOptions = function() {
            
            const options = original_getCanvasMenuOptions.apply(this, arguments)

            options.push(null)
            
            options.push({
                content: "csv-utils",
                has_submenu : true , 
                callback: make_submenu
            })

            return options
        }
    } ,

    async beforeRegisterNodeDef(nodeType, nodeData, app) {
        if(nodeType.comfyClass == NODE_CLASS) {
            
            const onNodeCreated = nodeType.prototype.onNodeCreated

            nodeType.prototype.onNodeCreated = function(...args) { 
                
                this.refreshNode = () => refreshList.call(this ,
                    this.widgets.find(w => w.name == 'fieldnameCombo')  ,  
                    this.widgets.find(w => w.name == 'fieldname')
                )
                
                const r =  onNodeCreated?.apply(this , arguments)

                const fieldnameWidget = this.widgets.find(w => w.name == 'fieldname')

                fieldnameWidget.hidden = true

                const fieldNamesCombo = this.addWidget("combo" , "fieldnameCombo" , "" , (option)=> {
                    fieldnameWidget.value = option
                } , {values : []} )

                
                this.addWidget("button" , "refresh combo list" , 0 ,  ()=> this.refreshNode() )

               return r 
            }

            

        }

        
    } ,



})



                        