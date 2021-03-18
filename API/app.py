from flask import Flask
from flask_restful import Api
from data_loading import CompanyData
from flask_cors import CORS, cross_origin
from technicals import Studies

app = Flask(__name__)
app.secret_key = 'college-project'

cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

api = Api(app)

api.add_resource(CompanyData, '/data/<string:name>')
api.add_resource(Studies, '/study/<string:cName>/<string:sName>')

app.run(debug=True)