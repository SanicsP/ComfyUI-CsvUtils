

class SearchRow : 
    @classmethod
    def INPUT_TYPES(s) : 

        return {
            "required" : {
                "csv_data" : ("CSVDATA",),
                "col_name" : ("STRING", {"default" : ""}) ,
                "row_name" : ("STRING",{"default" : ""}) 
            }
        }
    
    CATEGORY = "csv_tools/advanced"
    
    FUNCTION = "execute"
    
    RETURN_TYPES = ("CSVROW",)
    
    RETURN_NAMES = ("selected_row",)
    
    OUTPUT_NODE = False
    
    DESCRIPTION = """
        Select a row from a list of rows, this node works with: "load csv data from file" and "select data from csv row"
    """
    
    def execute(self , csv_data , col_name , row_name) : 
        
        try : 
            for row in csv_data["rows"] : 
                if row_name == row[col_name] : 
                    return (row ,)
            raise RuntimeError( row_name , "not found in" , col_name , "column")
        except KeyError : 
            raise RuntimeError("the field" , col_name , "does not exists in your file. Your file has the following col_names : " , csv_data["col_names"])        

