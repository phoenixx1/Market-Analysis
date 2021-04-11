
import math
import matplotlib
import numpy as np
import pandas as pd
import seaborn as sns
import time

from datetime import date, datetime, time, timedelta
from matplotlib import pyplot as plt
from pylab import rcParams
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error
from sklearn.metrics import r2_score


fontsize = 14
ticklabelsize = 14
N_opt = 5
test_size = 0.2                 # proportion of dataset to be used as test set
cv_size = 0.2                   # proportion of dataset to be used as cross-validation set
Nmax = 30

def get_preds_lin_reg(df, target_col, N, pred_min, offset):
    regr = LinearRegression(fit_intercept=True)
    pred_list = []
    for i in range(offset, len(df['close'])):
        X_train = np.array(range(len(df['close'][i-N:i]))) 
        y_train = np.array(df['close'][i-N:i])
        X_train = X_train.reshape(-1, 1)
        y_train = y_train.reshape(-1, 1)

        regr.fit(X_train, y_train)
        pred = regr.predict(np.array(N).reshape(1,-1))
        pred_list.append(pred[0][0])  
    
    pred_list = np.array(pred_list)
    pred_list[pred_list < pred_min] = pred_min
        
    return pred_list

def get_mape(y_true, y_pred): 
    """
    Compute mean absolute percentage error (MAPE)
    """
    y_true, y_pred = np.array(y_true), np.array(y_pred)
    return np.mean(np.abs((y_true - y_pred) / y_true)) * 100

stk_path = '../data/TATAMOTORS.csv'

df = pd.read_csv(stk_path, sep = ",")
df['Date'] = df['Date'].apply(str)

for i in range(0, len(df['Date'])):
    df['Date'][i] = df['Date'][i][:4] + '-' + df['Date'][i][4:6] + '-' + df['Date'][i][6:]
    
df.loc[:, 'Date'] = pd.to_datetime(df['Date'],format='%Y-%m-%d')
df.columns = [str(x).lower().replace(' ', '_') for x in df.columns]
df['month'] = df['date'].dt.month
df.sort_values(by='date', inplace=True, ascending=True)

# rcParams['figure.figsize'] = 10, 8 # width 10, height 8

# ax = df.plot(x='date', y='close', style='b-', grid=True)
# ax.set_xlabel("date")
# ax.set_ylabel("INR")
# plt.show()


# Get sizes of each of the datasets
num_cv = int(cv_size*len(df))
num_test = int(test_size*len(df))
num_train = len(df) - num_cv - num_test
# print("num_train = " + str(num_train))
# print("num_cv = " + str(num_cv))
# print("num_test = " + str(num_test))

# Split into train, cv, and test
train = df[:num_train].copy()
cv = df[num_train:num_train+num_cv].copy()
train_cv = df[:num_train+num_cv].copy()
test = df[num_train+num_cv:].copy()
# print("train.shape = " + str(train.shape))
# print("cv.shape = " + str(cv.shape))
# print("train_cv.shape = " + str(train_cv.shape))
# print("test.shape = " + str(test.shape))

# Plot adjusted close over time
rcParams['figure.figsize'] = 10, 8 # width 10, height 8

# ax = train.plot(x='date', y='close', style='b-', grid=True)
# ax = cv.plot(x='date', y='close', style='y-', grid=True, ax=ax)
# ax = test.plot(x='date', y='close', style='g-', grid=True, ax=ax)
# ax.legend(['train', 'dev', 'test'])
# ax.set_xlabel("date")
# ax.set_ylabel("USD")
# plt.show()

RMSE = []
R2 = []
mape = []
for N in range(1, Nmax+1): # N is no. of samples to use to predict the next value
    est_list = get_preds_lin_reg(train_cv, 'close', N, 0, num_train)
    
    cv.loc[:, 'est' + '_N' + str(N)] = est_list
    RMSE.append(math.sqrt(mean_squared_error(est_list, cv['close'])))
    R2.append(r2_score(cv['close'], est_list))
    mape.append(get_mape(cv['close'], est_list))

# print('RMSE = ' + str(RMSE))
# print('R2 = ' + str(R2))
# print('MAPE = ' + str(mape))

# matplotlib.rcParams.update({'font.size': 14})
# plt.figure(figsize=(12, 8), dpi=80)
# plt.plot(range(1, Nmax+1), RMSE, 'x-')
# plt.grid()
# plt.xlabel('N')
# plt.ylabel('RMSE')
# plt.xlim([2, 30])
# plt.show()

# matplotlib.rcParams.update({'font.size': 14})
# plt.figure(figsize=(12, 8), dpi=80)
# plt.plot(range(1, Nmax+1), R2, 'x-')
# plt.grid()
# plt.xlabel('N')
# plt.ylabel('R2')
# plt.show()

# plt.figure(figsize=(12, 8), dpi=80)
# plt.plot(range(1, Nmax+1), mape, 'x-')
# plt.grid()
# plt.xlabel('N')
# plt.ylabel('MAPE')
# plt.show()

est_list = get_preds_lin_reg(df, 'adj_close', N_opt, 0, num_train+num_cv)
test.loc[:, 'est' + '_N' + str(N_opt)] = est_list

# Plot adjusted close over time, only for test set
rcParams['figure.figsize'] = 10, 8 # width 10, height 8
matplotlib.rcParams.update({'font.size': 14})

ax = test.plot(x='date', y='close', style='gx-', grid=True)
ax = test.plot(x='date', y='est_N5', style='rx-', grid=True, ax=ax)
ax.legend(['test', 'predictions using linear regression'], loc='upper left')
ax.set_xlabel("date")
ax.set_ylabel("INR")
ax.set_xlim([date(2018, 4, 23), date(2018, 11, 23)])
ax.set_ylim([130, 155])
plt.show()