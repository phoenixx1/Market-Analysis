import numpy as np
import pandas as pd
from matplotlib import pyplot as plt
from sklearn.preprocessing import MinMaxScaler

df = pd.read_csv('../data/3MINDIA.csv')
df['Date'] = df['Date'].apply(str)
df['Date'] = pd.to_datetime(df.Date,format='%Y-%m-%d')
df.set_index("Date", drop=False, inplace=True)

dates = df['Date']
df.drop(['Date'], axis=1, inplace=True)
scaler = MinMaxScaler(feature_range=(0, 1))
data = scaler.fit_transform(df)
data = pd.DataFrame(data, index=df.index, columns=df.columns)
data['Date'] = dates

X = data
cut = int(len(X)*0.8)

X_train = X[:cut]
X_test = X[cut:]
X_train[['Date', 'Close']]

from fbprophet import Prophet

model = Prophet()
model.fit(X_train[["Date", "Close"]].rename(columns={"Date": "ds", "Close": "y"}))

forecast = model.predict(X_test[["Date", "Close"]].rename(columns={"Date": "ds"}))

plt.figure(figsize=(20, 5))
plt.plot(X['Close'])
plt.plot(X_test.index, forecast.yhat)
plt.show()