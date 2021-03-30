import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
import ta
import pickle
# # import missingno as msno
# import plotly.express as px
# import plotly.graph_objects as go
import matplotlib.dates as mdates
import scipy.stats
from sklearn.metrics import mean_absolute_error, mean_squared_error
import pylab
from pmdarima import auto_arima

df = pd.read_csv('../data/TATAMOTORS.csv')

df = df.reset_index()

a = ta.volume.VolumeWeightedAveragePrice(df.High, df.Low, df.Close, df.Volume)
df['VWAP'] = a.volume_weighted_average_price() 

lag_features = ["High", "Low", "Volume", "Close"]
window1 = 3
window2 = 7
window3 = 30

df_rolled_3d = df[lag_features].rolling(window=window1, min_periods=0)
df_rolled_7d = df[lag_features].rolling(window=window2, min_periods=0)
df_rolled_30d = df[lag_features].rolling(window=window3, min_periods=0)

df_mean_3d = df_rolled_3d.mean().shift(1).reset_index().astype(np.float32)
df_mean_7d = df_rolled_7d.mean().shift(1).reset_index().astype(np.float32)
df_mean_30d = df_rolled_30d.mean().shift(1).reset_index().astype(np.float32)

df_std_3d = df_rolled_3d.std().shift(1).reset_index().astype(np.float32)
df_std_7d = df_rolled_7d.std().shift(1).reset_index().astype(np.float32)
df_std_30d = df_rolled_30d.std().shift(1).reset_index().astype(np.float32)

for feature in lag_features:
    df[f"{feature}_mean_lag{window1}"] = df_mean_3d[feature]
    df[f"{feature}_mean_lag{window2}"] = df_mean_7d[feature]
    df[f"{feature}_mean_lag{window3}"] = df_mean_30d[feature]
    
    df[f"{feature}_std_lag{window1}"] = df_std_3d[feature]
    df[f"{feature}_std_lag{window2}"] = df_std_7d[feature]
    df[f"{feature}_std_lag{window3}"] = df_std_30d[feature]

df.fillna(df.mean(), inplace=True)

df.set_index("Date", drop=False, inplace=True)

df.Date = pd.to_datetime(df.Date, format="%Y-%m-%d")
df["month"] = df.Date.dt.month
df["week"] = df.Date.dt.isocalendar().week
df["day"] = df.Date.dt.day
df["day_of_week"] = df.Date.dt.dayofweek

df_train = df[df.Date < "2019"]
df_valid = df[df.Date >= "2019"]

exogenous_features = ["High_mean_lag3", "High_std_lag3", "Low_mean_lag3", "Low_std_lag3",
                      "Volume_mean_lag3", "Volume_std_lag3", "High_mean_lag7", "High_std_lag7", 
                      "Low_mean_lag7", "Low_std_lag7", "Volume_mean_lag7", "Volume_std_lag7", 
                      "High_mean_lag30", "High_std_lag30", "Low_mean_lag30", "Low_std_lag30",
                      "Volume_mean_lag30", "Volume_std_lag30", "Close_mean_lag3", "Close_mean_lag7",
                      "Close_mean_lag30","Close_std_lag3","Close_std_lag7","Close_std_lag30",
                      "month","week","day","day_of_week"]


with open('AXISBANK.pkl', 'rb') as pkl:
    # pickle_preds = pickle.load(pkl).predict(n_periods=5)
    forecast = pickle.load(pkl).predict(n_periods=len(df_valid), exogenous=df_valid[exogenous_features])
    df_valid["Forecast_ARIMAX"] = forecast

# print(df_valid["Forecast_ARIMAX"])
df_valid[["VWAP", "Forecast_ARIMAX"]].plot(figsize=(14, 7))
plt.show()