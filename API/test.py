import pandas as pd
import talib
import json
import numpy as np
import glob

# Auto, Banks, Banks-PSU, Beverages, Chemicals
# Computers, Construction, Consumer Goods, Finance, FMCG

company_list = glob.glob("NewData/*.csv")

def applyStudy(companyName, studyName):
    with open('talib.json') as f:
        studies = json.load(f)

    data = pd.read_csv(str(companyName))

    data["Volume"] = data["Volume"].astype('float')
    data["Open"] = data["Open"].astype('float')
    data["High"] = data["High"].astype('float')
    data["Low"] = data["Low"].astype('float')
    data["Close"] = data["Close"].astype('float')


    argument_list = studies[studyName]
    argument_data = []
    for arg in argument_list:
        argument_data.append(data[arg].to_numpy())


    return_list = getattr(talib, studyName)(*argument_data)
    ret = {}

    if type(return_list) is tuple:
        for i in range(0, len(return_list)):
            ret[i] = return_list[i].tolist()
        return_q = len(return_list)

    else:
        ret = return_list.tolist()
        return_q = 1

    return ret

def ret_csv(cName: str):
    with open('talib.json') as f:
        studies = json.load(f)

    data = pd.read_csv(cName)
    
    for i in studies.keys():
        study = applyStudy(cName, i)
        if type(study) == list:
            study = np.around(np.array(study),2)
            data[i] = study
        if type(study) == dict:
            for key in study.keys():
                data[str(i) + str(key)] = study[key]
    data.to_csv('a/' + cName[8:], index=False)

for i in company_list:
    try:
        ret_csv(i)
    except:
        print(i)


# import pandas as pd
# import glob

# clist = glob.glob("../NSE/*.csv")

# for company in clist:
#     df = pd.read_csv(company)

#     if "Open" not in df.columns:
#         df.columns = ["Date", "Open", "High", "Low", "Close", "Volume"]
        
#     df['Date'] = df['Date'].apply(str)
#     for i in range(0, len(df['Date'])):
#         df['Date'][i] = df['Date'][i][:4] + '-' + df['Date'][i][4:6] + '-' + df['Date'][i][6:]

#     df.to_csv('data/' + str(company[7:]), index = False)
