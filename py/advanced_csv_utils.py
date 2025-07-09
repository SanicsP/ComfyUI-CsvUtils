import csv

class CSVManager : 
    
    def loadFile(file_path : str , delimiter : str = ",") -> dict :
        
        try : 
            with open(file_path , "r" , encoding="utf-8" , newline='') as csv_file :
                
                reader : csv.DictReader = csv.DictReader(csv_file , delimiter=delimiter)
                
                fieldnames : list = reader.fieldnames
                
                rows_data : list[dict] = []
                               
                for row in reader : rows_data.append(row)
                
                return {
                    "fieldnames" : fieldnames , 
                    "rows" : rows_data ,
                    "row-count" : len(rows_data)
                }
            
        except FileNotFoundError : 
            print(f"[csv-utils] : The file {file_path} was not found")
            return {
                "fieldnames" : [] ,
                "rows" : [] , 
                "row-count" : 0
            }
        except Exception : 
            print(f"[csv-utils] : Error while loading the file {file_path}")
            return {
                "fieldnames" : [] ,
                "rows" : [] , 
                "row-count" : 0
            }


    def appendRow(file_path : str , row  : dict , fieldnames : list[str] , delimiter : str=",") : 
        
        try : 
            if fieldnames == []  : raise RuntimeError("The fieldnames are empty")
            
            if all( map( lambda value : len(value) == 0 , row.values() ) ) or row == {} : raise RuntimeError("You can't save an empty row")
            
            temp_csv_data : dict = CSVManager.loadFile(file_path)
            temp_fieldnames = temp_csv_data["fieldnames"]

            with open(file_path , "a" , encoding="utf-8" , newline='') as csv_file : 
                writer = csv.DictWriter(csv_file , delimiter=delimiter , fieldnames=temp_fieldnames)
                writer.writerow(row)

        except Exception : 
            print("[CsvUtils/CsvManager] error while adding a row to the file , row not saved" , file_path)


if __name__ =="__main__" : 
    
    csv_data : dict = CSVManager.loadFile("example/empty.csv")
    
    for row in csv_data["rows"] : print(f"[csv-utils] csv row : {row}\n")

    print(csv_data)
    pass 