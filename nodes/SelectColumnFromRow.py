
class SelectColumnFromRow : 
    @classmethod
    def INPUT_TYPES(s) : 

        return {
            "required" : {
                "selected_row" : ("CSVROW" ,),
                "column" : ("INT", {"min":0}) , 
            }
        }
    
    CATEGORY = "csv_tools/advanced"
    
    FUNCTION = "execute"
    
    RETURN_TYPES = ("STRING",)
    
    RETURN_NAMES = ("data",)
    
    OUTPUT_NODE = False
    
    DESCRIPTION = """
        This node selects data on a row based on the number of the chosen column
    """

    def execute(self , selected_row  , column) : 
        if type(selected_row) == dict : 
            row_list : list = list(selected_row.values())
            return (row_list[column],)
        else : 
            raise TypeError("you must provide a row")

