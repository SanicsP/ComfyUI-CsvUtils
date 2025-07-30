
class PromptComposer : 
    @classmethod
    def INPUT_TYPES(s) : 

        return {
            "required" : {
                "delimiter" : ("STRING",{"default" : ","})
            }
        }

    
    CATEGORY = "csv_tools/prompting"
    
    FUNCTION = "execute"
    
    RETURN_TYPES = ("STRING",)
    
    RETURN_NAMES = ("prompt",)
    
    OUTPUT_NODE = True

    DESCRIPTION = """
        Node for merge prompt sequence toghether 
    """
    

    def execute(self , delimiter ,  **kwargs) : 
        out = delimiter.join(list(kwargs.values()))
        return {
            "ui" : {
                "text" : (out,)
            } ,
            "result" : (out,)
            }
    
    

