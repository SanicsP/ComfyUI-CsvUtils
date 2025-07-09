from ..py.advanced_csv_utils import *

class CSVAdvancedSearch : 
    @classmethod
    def INPUT_TYPES(s) : 

        return {
            "required" : {
                "file_path" : ("STRING",) , 
            }
        }
        
    CATEGORY = "csv_tools/advanced"
    
    FUNCTION = "execute"
    
    RETURN_TYPES = ()
    
    #RETURN_NAMES = ""
    
    OUTPUT_NODE = False

    DESCRIPTION = """
        Returns one or more results from the available rows in any csv file (provided it is valid) based on the query in the search bar.
        This node only works in frontend , dont use it if you plan to use your workflow with the api
    """
    

    def execute(self , file_path) : 
        
        return ()
        

