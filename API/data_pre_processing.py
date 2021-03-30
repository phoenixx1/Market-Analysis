import pandas as pd 
import glob

company_list = glob.glob("NSE_Data/*.csv")

for company in company_list:
    company_file = pd.read_csv(company)
    if (not any(cell.isdigit() for cell in company_file)) == False:
        company_file.columns = ["Date", "Open", "High", "Low", "Close", "Volume"]
        company_file.to_csv('NewData' + str(company[8:]), index = False)
    else:
        company_file.to_csv('NewData' + str(company[8:]), index = False)
    