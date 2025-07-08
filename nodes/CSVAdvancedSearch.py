from ..py.advanced_csv_utils import *

class CSVAdvancedSearch : 
    @classmethod
    def INPUT_TYPES(s) : 

        return {
            "required" : {
                "file_path" : ("STRING",) , 
            }
        }
    
    @classmethod 
    def IS_CHANGED(file_path) : 
        csv_data = CSVManager.loadFile(file_path)
        return (csv_data,)
        
    CATEGORY = "csv_tools/advanced"
    
    FUNCTION = "execute"
    
    RETURN_TYPES = ()
    
    #RETURN_NAMES = ""
    
    OUTPUT_NODE = False
    

    def execute(self , file_path) : 
        
        return ()
        

