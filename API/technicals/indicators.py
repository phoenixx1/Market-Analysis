from flask_restful import Resource
from flask import jsonify
import pandas as pd
import json
import talib

class Studies(Resource):
    def get(self, cName: str):
        p = open(cName + '.json')
        prices = json.load(p)

        return {'prices': prices}
        
