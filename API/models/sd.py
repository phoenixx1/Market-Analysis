import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

data = pd.read_csv("../data/AXISBANK.csv", parse_dates=['Date'], index_col='Date', 
                    usecols=['Date', 'Open','High','Low','Close','Volume'])

data = data.reset_index()
lag_features = ["Open", "High", "Low", "Close", "VWAP", "Volume"]
window1 = 3
window2 = 7
window3 = 30

df_rolled_3d = data[lag_features].rolling(window=window1, min_periods=0)
df_rolled_7d = data[lag_features].rolling(window=window2, min_periods=0)
df_rolled_30d = data[lag_features].rolling(window=window3, min_periods=0)

df_mean_3d = df_rolled_3d.mean().shift(1).reset_index().astype(np.float32)
df_mean_7d = df_rolled_7d.mean().shift(1).reset_index().astype(np.float32)
df_mean_30d = df_rolled_30d.mean().shift(1).reset_index().astype(np.float32)

df_std_3d = df_rolled_3d.std().shift(1).reset_index().astype(np.float32)
df_std_7d = df_rolled_7d.std().shift(1).reset_index().astype(np.float32)
df_std_30d = df_rolled_30d.std().shift(1).reset_index().astype(np.float32)

for feature in lag_features:
    data[f"{feature}_mean_lag{window1}"] = df_mean_3d[feature]
    data[f"{feature}_mean_lag{window2}"] = df_mean_7d[feature]
    data[f"{feature}_mean_lag{window3}"] = df_mean_30d[feature]
    
    data[f"{feature}_std_lag{window1}"] = df_std_3d[feature]
    data[f"{feature}_std_lag{window2}"] = df_std_7d[feature]
    data[f"{feature}_std_lag{window3}"] = df_std_30d[feature]

data.set_index("Date", drop=False, inplace=True)
data.interpolate(method='time', inplace=True)
data.fillna(data.mean(), inplace=True)
data.head()