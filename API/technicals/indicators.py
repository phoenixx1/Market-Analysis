from flask_restful import Resource
from flask import jsonify
import pandas as pd
import json
import talib


def applyStudy(companyName, studyName):
    with open('technicals/talib.json') as f:
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

    return {studyName: ret, "metadata": {"return_q": return_q}}

class Studies(Resource):
    def get(self, cName, sName):
        study = applyStudy(cName, sName)
        return study
