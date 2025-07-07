import csv


DELIMITER = ","

def get_prompt_list(file_path : str) : 
    
    row_list = []
    
    with open(file_path , 'r' , encoding="utf8") as csv_file:

        reader = csv.reader(csv_file , delimiter=DELIMITER)
        i = 0
        for row in reader : 
           row_list.append(
                {   "id" : i , 
                    "positive" : row[0] if len(row) > 0 and len(row[0]) > 0 else "(EMPTY)" , 
                    "negative" : row[1] if len(row) > 1 and len(row[1]) > 0 else "(EMPTY)"
                }
           )

           i += 1
        
        csv_file.close()

        return row_list


def save_to_csv(file_path : str , pos_prompt :str , neg_prompt :str) : 
        
        prompt_list = get_prompt_list(file_path)

        if already_exists(prompt_list , pos_prompt , neg_prompt) :
            print("the prompt already exists in the file") 
            return False
        
        if pos_prompt.strip() == 0 : 
            print("[csv utils] at least positive prompt hasn't to be empty")
            print("[csv utils] prompt not saved")
            return False
        
        with open(file_path , 'a' , newline='' , encoding="utf8") as csv_file:

            writer_object = csv.writer(csv_file , delimiter=DELIMITER)

            writer_object.writerow([pos_prompt , neg_prompt])

            csv_file.close()

        return True

def already_exists(prompt_list: list[dict] , pos_prompt : str , neg_prompt : str) :
    
        for row in prompt_list : 
            if row["positive"] == pos_prompt and row["negative"] == neg_prompt :
                print(" [CSV utils] the prompt already exists in the file ") 
                return True

        return False

def show_prompt_list(prompt_list) : 
    for prompt in prompt_list : 
        print("pos: {}\t neg: {}".format(prompt['positive'] , prompt['negative']))


def get_prompt_row(prompt_list : list[dict] , index : int) -> dict[str , str] :

    i = 0
    for row in prompt_list : 
        if i == index : 
            return {   
                    "positive" : row["positive"] if row["positive"] != "(EMPTY)" else "" , 
                    "negative" : row["negative"] if row["negative"] != "(EMPTY)" else ""
                }
        i+= 1
    return {
        "positive" : "" , 
        "negative" : ""
    }
     