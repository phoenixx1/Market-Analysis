import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import ta
import pickle
from pmdarima import auto_arima
import glob

# For API
from flask_restful import Resource
from flask import jsonify
import json

class ARIMAModel:
    df = pd.DataFrame()
    df_train = pd.DataFrame()
    df_test = pd.DataFrame()
    
    exogenous_features = ["High_mean_lag3", "High_std_lag3", "Low_mean_lag3", "Low_std_lag3",
                      "Volume_mean_lag3", "Volume_std_lag3", "High_mean_lag7", "High_std_lag7", 
                      "Low_mean_lag7", "Low_std_lag7", "Volume_mean_lag7", "Volume_std_lag7", 
                      "High_mean_lag30", "High_std_lag30", "Low_mean_lag30", "Low_std_lag30",
                      "Volume_mean_lag30", "Volume_std_lag30", "Close_mean_lag3", "Close_mean_lag7",
                      "Close_mean_lag30","Close_std_lag3","Close_std_lag7","Close_std_lag30",
                      "month","week","day","day_of_week"]

    def __init__(self, cName: str):
        self.name = cName
        
    def load_data(self):
        self.df = pd.read_csv('data/' + self.name + '.csv')
        self.df = self.df.reset_index()

        a = ta.volume.VolumeWeightedAveragePrice(self.df.High, self.df.Low, self.df.Close, self.df.Volume)
        self.df['VWAP'] = a.volume_weighted_average_price() 

        self.df_train = self.df[self.df.Date < "2019"]
        self.df_valid = self.df[self.df.Date >= "2019"]


    def add_lag_features(self):
        lag_features = ["High", "Low", "Volume", "Close"]
        window1 = 3
        window2 = 7
        window3 = 30

        df_rolled_3d = self.df[lag_features].rolling(window=window1, min_periods=0)
        df_rolled_7d = self.df[lag_features].rolling(window=window2, min_periods=0)
        df_rolled_30d = self.df[lag_features].rolling(window=window3, min_periods=0)

        df_mean_3d = df_rolled_3d.mean().shift(1).reset_index().astype(np.float32)
        df_mean_7d = df_rolled_7d.mean().shift(1).reset_index().astype(np.float32)
        df_mean_30d = df_rolled_30d.mean().shift(1).reset_index().astype(np.float32)

        df_std_3d = df_rolled_3d.std().shift(1).reset_index().astype(np.float32)
        df_std_7d = df_rolled_7d.std().shift(1).reset_index().astype(np.float32)
        df_std_30d = df_rolled_30d.std().shift(1).reset_index().astype(np.float32)

        for feature in lag_features:
            self.df[f"{feature}_mean_lag{window1}"] = df_mean_3d[feature]
            self.df[f"{feature}_mean_lag{window2}"] = df_mean_7d[feature]
            self.df[f"{feature}_mean_lag{window3}"] = df_mean_30d[feature]
            
            self.df[f"{feature}_std_lag{window1}"] = df_std_3d[feature]
            self.df[f"{feature}_std_lag{window2}"] = df_std_7d[feature]
            self.df[f"{feature}_std_lag{window3}"] = df_std_30d[feature]

        self.df.fillna(self.df.mean(), inplace=True)

        self.df.set_index("Date", drop=False, inplace=True)

        self.df.Date = pd.to_datetime(self.df.Date, format="%Y-%m-%d")
        self.df["month"] = self.df.Date.dt.month
        self.df["week"] = self.df.Date.dt.isocalendar().week
        self.df["day"] = self.df.Date.dt.day
        self.df["day_of_week"] = self.df.Date.dt.dayofweek
    
    def traintestsplit(self):
        self.df_train = self.df[self.df.Date < "2019"]
        self.df_valid = self.df[self.df.Date >= "2019"]

    def train_model(self):
        if ('models/trainedModels/' + self.name + '.pkl') in glob.glob('models/trainedModels/*.pkl'):
            with open('models/trainedModels/' + self.name + '.pkl', 'rb') as pkl:
                forecast = pickle.load(pkl).predict(n_periods=len(self.df_valid), 
                                                        exogenous=self.df_valid[self.exogenous_features])
                self.df_valid["Forecast_ARIMA"] = forecast

        else:
            self.model = auto_arima(self.df_train.VWAP, exogenous=self.df_train[self.exogenous_features], 
                                        trace=True, error_action="ignore", suppress_warnings=True)
            self.model.fit(self.df_train.VWAP, exogenous=self.df_train[self.exogenous_features])
            self.save()

            forecast = self.model.predict(n_periods=len(self.df_valid), exogenous=self.df_valid[self.exogenous_features])
            self.df_valid["Forecast_ARIMA"] = forecast

        # To plot
        # self.plotPred()
        return self.df_valid


    def save(self):
        with open('models/trainedModels/' + self.name + '.pkl', 'wb') as pkl:
            pickle.dump(self.model, pkl)

    def run(self):
        self.load_data()
        self.add_lag_features()
        self.traintestsplit()
        pred = self.train_model()
        
        return pred
        

    def plotPred(self):
        self.df_valid[["VWAP", "Forecast_ARIMA"]].plot(figsize=(14, 7))
        plt.show()


class ARIMA(Resource):
    def get(self, name: str):
        model = ARIMAModel(name)
        pred = model.run()
        pred1 = pd.DataFrame()
        pred1['Date'] = pred['Date'].astype(str).values
        pred1['VWAP'] = pred['VWAP'].values
        pred1['Forecast_ARIMA'] = pred['Forecast_ARIMA'].values
    
        p = []

        for i in pred1.index:
            p.append(pred1.loc[i].to_dict())

        return p, 200

       

# model = ARIMAModel('AXISBANK')
# pred = model.run()
# pred1 = pd.DataFrame()
# pred1['Date'] = pred['Date'].astype(str).values
# pred1['VWAP'] = pred['VWAP'].values
# pred1['Forecast_ARIMA'] = pred['Forecast_ARIMA'].values

# p = []

# for i in pred1.index:
#     p.append(pred1.loc[i].to_json())

# print(p)