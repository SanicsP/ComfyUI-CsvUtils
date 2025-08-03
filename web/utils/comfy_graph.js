import { api } from "../../../../scripts/api.js";
import { app } from "../../../../scripts/app.js";



function getOriginByInputLinkId(linkId) {

    const LLinkObj = app.graph.links[linkId]
        
    const originNodeId = LLinkObj.origin_id

    const originNode = app.graph._nodes_by_id[originNodeId]

    return originNode
}

export function findNodeAncestor(node , nodeClass) {
    
    let nodeIdQueue = []
    nodeIdQueue.push(node.id)

    while (nodeIdQueue.length != 0) {
        const currentNode = app.graph._nodes_by_id[nodeIdQueue.shift()]

        for(let inputSlot of currentNode.inputs) {
            const linkId = inputSlot.link
            if(linkId) {
                const originNode = getOriginByInputLinkId(linkId)
                
                if(originNode.comfyClass == nodeClass) {
                    return originNode
                }
                
                if(!nodeIdQueue.includes(originNode.id))
                    nodeIdQueue.push(originNode.id)
            }
        }
    }

    return null
}