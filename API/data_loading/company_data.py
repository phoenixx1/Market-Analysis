from flask_restful import Resource
from flask import jsonify
import pandas as pd
import json

class CompanyData(Resource):
    def get(self, name: str):
        p = open('data_json/' + name + '.json')
        prices = json.load(p)

        return {'prices': prices}, 200
