from ..py.advanced_csv_utils import *

class LoadCSVFile : 
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
    
    RETURN_TYPES = ("*" ,)
    
    RETURN_NAMES = ("csv_data" ,)
    
    OUTPUT_NODE = True

    DESCRIPTION = """
        Loads all data from a csv file into a list of rows, works with "select row from csv data" node
    """
    

    def execute(self , file_path) : 
        csv_data = CSVManager.loadFile(file_path)
        if csv_data["rows"] == [] : raise RuntimeError("The csv array is empty")
        #return (csv_data,)
        return {
            "ui" : {
                "text" : (csv_data["fieldnames"],csv_data["row-count"]) 
            } ,
            "result" : (csv_data,)
            }
        

