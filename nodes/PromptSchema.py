import re
class PromptSchema : 
    @classmethod
    def INPUT_TYPES(s) : 

        return {
            "required" : {
                "schema" : ("STRING",{"default" : "" , "multiline" : True}) , 
            } , 
        }

    
    CATEGORY = "csv_tools/prompting"
    
    FUNCTION = "execute"
    
    RETURN_TYPES = ("STRING",)
    
    RETURN_NAMES = ("prompt",)
    
    OUTPUT_NODE = False

    DESCRIPTION = """
        Make prompts with variables to replace
    """
    

    def execute(self , schema ,  **kwargs) : 

        for key , replacement in kwargs.items() : 
            schema = schema.replace(f"[{key}]" , replacement)
        
        out = schema
        
        return {
            "ui" : {
                "text" : (out,)
            } ,
            "result" : (out,)
            }
    
    

