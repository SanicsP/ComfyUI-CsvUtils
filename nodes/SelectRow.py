

class SelectRow : 
    @classmethod
    def INPUT_TYPES(s) : 

        return {
            "required" : {
                "csv_data" : ("CSVDATA" ,),
                "row" : ("INT",{"min" : 0 , "max" : 9223372036854776000}) , 
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
    
    def execute(self , csv_data , row) : 
        if row < 0 : raise IndexError("You can't provide a negative number as index")
        
        selected_row = csv_data["rows"][row]
        
        return (selected_row,)
        

