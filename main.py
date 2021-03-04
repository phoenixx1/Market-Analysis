from flask import Flask
from flask_restful import Api, Resource, reqparse, abort, fields, marshal_with
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
api = Api(app)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.prices'

prices = SQLAlchemy(app)

class priceModel(prices.Model):
    s_no = prices.Column(prices.Integer, primary_key=True)
    # security_code = prices.Column(prices.Integer, nullable=False)
    ticker = prices.Column(prices.String(20), nullable=False)
    date = prices.Column(prices.String(20), nullable=False)
    open = prices.Column(prices.Float, nullable=False)
    high = prices.Column(prices.Float, nullable=False)
    low = prices.Column(prices.Float, nullable=False)
    close = prices.Column(prices.Float, nullable=False)
    volume = prices.Column(prices.Float, nullable=False)
    # WAP = prices.Column(prices.Integer, nullable=False)
    # num_shares = prices.Column(prices.Integer, nullable=False)
    # num_trades = prices.Column(prices.Integer, nullable=False)
    # turnover = prices.Column(prices.Integer, nullable=False)
    # delevirable_quant = prices.Column(prices.Integer, nullable=False)
    # delQuant_tradeQuant_percent = prices.Column(prices.Integer, nullable=False)
    # spread_HL = prices.Column(prices.Integer, nullable=False)    
    # spread_CO = prices.Column(prices.Integer, nullable=False)

prices.create_all()

insert_data = reqparse.RequestParser()
insert_data.add_argument("ticker", type=str, help="need ticker value...", required=True)
insert_data.add_argument("date", type=str, help="need date value...", required=True)
insert_data.add_argument("open", type=float, help="need open value...", required=True)
insert_data.add_argument("high", type=float, help="need high value...", required=True)
insert_data.add_argument("low", type=float, help="need low value...", required=True)
insert_data.add_argument("close", type=float, help="need close value...", required=True)
insert_data.add_argument("volume", type=float, help="need volume value...", required=True)



#ticker_data = reqparse.RequestParser()
#ticker_data.add_argument('ticker', type=str, help ="Ticker Value Is Required.", required=True)

resource_fields = {
    's_no': fields.Integer,
    'ticker': fields.String,
    'date': fields.String,
    'open': fields.Float,
    'high': fields.Float,
    'low': fields.Float,
    'close': fields.Float,
    'volume': fields.Float
}

class Price(Resource):

    @marshal_with(resource_fields)
    def put(self, s_num):
        args = insert_data.parse_args()
        result = priceModel.query.filter_by(s_no=s_num).first()
        if result:
            abort(409, message="existing entry...")
        values = priceModel(s_no=s_num, ticker=args['ticker'], date=args['date'], open=args['open'], high=args['high'], low=args['low'], close=args['close'], volume=args['volume'])
        prices.session.add(values)
        prices.session.commit()
        return values, 201

class getValues(Resource):

    @marshal_with(resource_fields)
    def get(self,ticker_id):
        #args = ticker_data.parse_args()
        result = priceModel.query.filter_by(ticker=ticker_id).all()
        if not result:
            abort(404, message="No Such Ticker Exists in Data.")
        return result

api.add_resource(Price,"/price/<int:s_num>")
api.add_resource(getValues,"/getValues/<string:ticker_id>")

if __name__ == "__main__":
    app.run(debug=True)