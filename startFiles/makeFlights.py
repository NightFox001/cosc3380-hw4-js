from random import randint
from datetime import date
import numpy

def turnSplitIntoTimestamp(year, month, day, hour, minute, second):
    return str(year) + "-" + str(month) + "-" + str(day).zfill(2) + " " + str(hour).zfill(2) + ":" + str(minute).zfill(2) + ":" + str(second).zfill(2) 

# based on arrival time
def getDeparture(year, month, day, hour, minute, second):
    hour = hour + 2 + randint(0, 1)
    return year, month, day, hour, randint(0,59), randint(0,59)

# based on departure time
def getArrival(year, month, day, hour, minute, second):
    hourDiff = randint(0, 1)
    hour = hour + 0 + hourDiff
    if (hourDiff == 0):
        return year, month, day, hour, randint(30,59), randint(0,59)
    else:
        return year, month, day, hour, randint(0,59), randint(0,59)


def getRandomStatus():
    #return 'Delayed' if (randint(0,50) == 1) else 'On Schedule'
    return 'On Schedule'


def returnTuplesOfAllPossibleAirportToFrom():
    listOfAirports = ['HOU', 'JFK', 'LAX', 'ORD', 'MIA', 'SEA', 'SFO', 'DEN', 'DFW', 'ATL']

    tupleOfAirports = []
    for dep in listOfAirports:
        for arr in listOfAirports:
            if (dep == arr):
                continue
            tupleOfAirports.append((dep, arr))

    return tupleOfAirports

def returnRandomAirportCode():
    switcher={
            0:'HOU',
            1:'JFK',
            2:'LAX',
            3:'ORD',
            4:'MIA',
            5:'SEA',
            6:'SFO',
            7:'DEN',
            8:'DFW',
            9:'ATL'
            }

    return switcher.get(randint(0,9),0)


def numberOfDays(y, m):
      leap = 0
      if y% 400 == 0:
         leap = 1
      elif y % 100 == 0:
         leap = 0
      elif y% 4 == 0:
         leap = 1
      if m==2:
         return 28 + leap
      list = [1,3,5,7,8,10,12]
      if m in list:
         return 31
      return 30

year1 = 2020
year2 = 2021
for y in "ab":
    year = year1 if y == "a" else year2
    for m in range(1,13):
        if (year == 2020 and m != 12):
            continue
        if (year == 2021 and m > 3):
            continue
        month = m
        for day in range(1,31):
            def makeFlight(seats_available, movieB, mealB, airCodeS, airCodeF, codeHashGate, year, month, day):
                for boeingAircraft in range(airCodeS,airCodeF):
                    hour = randint(4,6)
                    minute = randint(0,59)
                    second = randint(0,59)
                    flight_cost = randint(150,300)
                    arAirport = returnRandomAirportCode()
                    for i in range(0,3):
                        deAirport = arAirport
                        arAirport = returnRandomAirportCode()
                        argate = chr(randint(97,103)) + str(randint(1,19))
                        degate = chr(randint(97,103)) + str(randint(1,19))
                        argateHash = arAirport + argate
                        degateHash = deAirport + degate
                        if (arAirport == deAirport):
                            i -= 1
                            continue
                        if (degateHash == argateHash):
                            i -= 1
                            continue
                        if (degateHash in codeHashGate or argateHash in codeHashGate):
                            i -= 1
                            continue
                        codeHashGate.append(argateHash)
                        codeHashGate.append(degateHash)
                        status = getRandomStatus()
                        seats_booked = 0
                        movie = 'TRUE' if (movieB) else 'FALSE'
                        meal = 'TRUE' if (mealB) else 'FALSE'
                        (year, month, day, hour, minute, second) = getArrival(year, month, day, hour, minute, second)
                        arrTime = turnSplitIntoTimestamp(year, month, day, hour, minute, second)
                        (year, month, day, hour, minute, second) = getDeparture(year, month, day, hour, minute, second)
                        depTime = turnSplitIntoTimestamp(year, month, day, hour, minute, second)
                        print("INSERT INTO flights (aircraft_code,scheduled_departure, scheduled_arrival, departure_airport_id, arrival_airport_id, departure_gate_id, arrival_gate_id, status, waitlist_no, seats_available, movie, meal, flight_cost)\nVALUES('" + str(boeingAircraft) + "','" + str(arrTime) + "','" + str(depTime) + "','" + str(deAirport) + "','" + str(arAirport) + "','" + str(degate) + "','" + str(argate) + "','" + str(status) + "','" + str(seats_booked) + "','" + str(seats_available) + "','" + str(movie) + "','" + str(meal) + "','" + str(flight_cost) + "');")

            codeHashGate = []
            makeFlight(210, True, True, 700, 733, codeHashGate, year, month, day)
            makeFlight(260, True, True, 300, 329, codeHashGate, year, month, day)
            makeFlight(150, False, True, 760, 798, codeHashGate, year, month, day)

