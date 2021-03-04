import requests
import os

lst = os.listdir('NSE')

Base = "http://127.0.0.1:5000/"

# data = [
#     {"ticker": "3MINDIA", "date": "1", "open": 566.6, "high": 579.95, "low": 565.55, "close": 570, "volume": 376},
#     {"ticker": "AARTIDRUGS", "date": "2", "open": 171.85, "high": 171.85, "low": 165.6, "close": 166.7, "volume": 89047},
#     {"ticker": "AARTIIND", "date": "3", "open": 370, "high": 370, "low": 356.3, "close": 358.05, "volume": 90422},
#     {"ticker": "3MINDIA", "date": "4", "open": 584, "high": 585, "low": 580, "close": 581.1, "volume": 1387}
# ]

count = 0

for item in lst:
    a_file = open("NSE/"+item, "r")
    lines = a_file.readlines()
    a_file.close()

    length = len(lines)

    data = []

    for i in range(0,length):
        values = {}

        val = lines[i].split(',')
        val[6] = val[6][:-1]

        values["ticker"] = val[0]
        values["date"] = val[1]
        values["open"] = float(val[2])
        values["high"] = float(val[3])
        values["low"] = float(val[4])
        values["close"] = float(val[5])
        values["volume"] = float(val[6])
        data.append(values)

    #count = 814

    for i in range(len(data)):
        response = requests.put(Base + "price/" + str(count), data[i] )
        count = count + 1
        print(count)

input()

response = requests.get(Base + "getValues/ALOKTEXT")
print(response.json())
