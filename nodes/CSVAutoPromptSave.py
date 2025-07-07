from ..py.csv_utils import * 
class CSVAutoPromptSave : 
    @classmethod
    def INPUT_TYPES(s) : 

        return {
            "required" : {
                "file_path" : ("STRING",) , 
                "positive_prompt" : ("STRING",{"default" : "" , "multiline" : False}) ,
                "negative_prompt" : ("STRING",{"default" : "" , "multiline" : False}) 
            }
        }
    
    CATEGORY = "csv_tools"
    
    FUNCTION = "execute"
    
    RETURN_TYPES = ("STRING" , "STRING")
    
    RETURN_NAMES = ("positive prompt" , "negative prompt")
    
    OUTPUT_NODE = False
    

    def execute(self , file_path , positive_prompt , negative_prompt) : 
        
        return (positive_prompt , negative_prompt)

