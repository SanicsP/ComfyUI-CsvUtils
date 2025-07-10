
class SelectColumnFromRow : 
    @classmethod
    def INPUT_TYPES(s) : 

        return {
            "required" : {
                "selected_row" : ("*" ,),
                "column" : ("INT", {"min":0}) , 
            }
        }
    
    CATEGORY = "csv_tools/advanced"
    
    FUNCTION = "execute"
    
    RETURN_TYPES = ("STRING",)
    
    RETURN_NAMES = ("data",)
    
    OUTPUT_NODE = False
    
    DESCRIPTION = """
        select a value from a row
    """

    def execute(self , selected_row  , column) : 
        if selected_row is dict : 
            row_list : list = list(selected_row.values())
            return (row_list[column],)
        else : 
            raise TypeError("you must provide a row")

