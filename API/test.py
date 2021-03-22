import pandas as pd
import talib
import json
import numpy as np

# Auto, Banks, Banks-PSU, Beverages, Chemicals
# Computers, Construction, Consumer Goods, Finance, FMCG

company_list = ["ASHOKLEY", "AXISBANK", "ANDHRABANK", "MCDOWELL-N", 
                "BASF", "3IINFOTECH", "ASHOKA", "BPL", "BAJAJFINSV",
                "DABUR" ]

def applyStudy(companyName, studyName):
    with open('talib.json') as f:
        studies = json.load(f)

    data = pd.read_csv('data/' + str(companyName) + '.csv')

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

    data = pd.read_csv('data/' + cName + '.csv')
    for i in studies.keys():
        study = applyStudy(cName, i)
        if type(study) == list:
            study = np.around(np.array(study),2)
            data[i] = study
    data.to_csv('d/' + cName + '.csv')

for i in company_list:
    ret_csv(i)