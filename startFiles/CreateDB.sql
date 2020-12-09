DROP TABLE IF EXISTS bookings CASCADE;
DROP TABLE IF EXISTS customer CASCADE;
DROP TABLE IF EXISTS ticket CASCADE;
DROP TABLE IF EXISTS passenger CASCADE;
DROP TABLE IF EXISTS payment CASCADE;
DROP TABLE IF EXISTS baggage CASCADE;
DROP TABLE IF EXISTS boarding CASCADE;
DROP TABLE IF EXISTS flights CASCADE;
DROP TABLE IF EXISTS aircrafts_in_service CASCADE;
DROP TABLE IF EXISTS aircraft_details CASCADE;
DROP TABLE IF EXISTS airport CASCADE;
DROP TABLE IF EXISTS gates CASCADE;

CREATE TABLE "tickets" (
  "ticket_id" SERIAL PRIMARY KEY,
  "flight_id" integer NOT NULL,
  "passenger_id" integer NOT NULL,
  "ticket_cost" integer,
  "waitlist_no" integer,
  "boarding_pass_id" integer NOT NULL,
  PRIMARY KEY ("ticket_id")
);

--CREATE INDEX "Key" ON  "tickets" ("ticket_cost", "waitlist_no");

CREATE TABLE "flights" (
  "flight_id" SERIAL PRIMARY KEY,
  "aircraft_code" char(3) NOT NULL,
  "scheduled_departure" timestamp,
  "scheduled_arrival" timestamp,
  "departure_airport_id" char(3) NOT NULL,
  "arrival_airport_id" char(3) NOT NULL,
  "departure_gate_id" char(3) NOT NULL,
  "arrival_gate_id" char(3) NOT NULL,
  "status" character varying(20),
  "waitlist_no" integer,
  "seats_available" integer,
  "movie" bool,
  "meal" bool,
  "flight_cost" float(7),
  PRIMARY KEY ("flight_id")
);

--CREATE INDEX "Key" ON  "flights" ("scheduled_departure", "scheduled_arrival", "status", "waitlist_no", "seats_available", "movie", "meal", "flight_cost");

CREATE TABLE "passengers" (
  "passenger_id" SERIAL PRIMARY KEY,
  "book_id" integer NOT NULL,
  "passenger_name" text NOT NULL,
  "phone" char(15),
  "email" varchar(30),
  PRIMARY KEY ("passenger_id")
);

--CREATE INDEX "Key" ON  "passengers" ("passenger_name", "phone", "email");

CREATE TABLE "boarding_passes" (
  "boarding_pass_id" SERIAL PRIMARY KEY,
  "boarding_gate" char(3) NOT NULL,
  "boarding_time" timestamp,
  PRIMARY KEY ("boarding_pass_id")
);

--CREATE INDEX "Key" ON  "boarding_passes" ("boarding_time");

CREATE TABLE "gates" (
  "gates" char(3) NOT NULL,
  PRIMARY KEY ("gates")
);

CREATE TABLE "airports" (
  "airport_id" char(3) NOT NULL,
  "airport_name" char(40) NOT NULL,
  "city" char(20) NOT NULL,
  PRIMARY KEY ("airport_id")
);

--CREATE INDEX "Key" ON  "airports" ("airport_name", "city");

CREATE TABLE "aircraft_details" (
  "model" char(25) NOT NULL,
  "max_seats" integer,
  "has_screens" bool,
  "has_kitchen" bool,
  PRIMARY KEY ("model")
);

--CREATE INDEX "Key" ON  "aircraft_details" ("max_seats", "has_screens", "has_kitchen");

CREATE TABLE "customers" (
  "customer_id" SERIAL PRIMARY KEY,
  "customer_name" text NOT NULL,
  "customer_email" varchar(30) UNIQUE,
  "password" text NOT NULL,
  "city" char(20),
  PRIMARY KEY ("customer_id")
);

--CREATE INDEX "Key" ON  "customers" ("customer_name", "customer_email", "password", "city");

CREATE TABLE "baggages" (
  "bag_id" SERIAL PRIMARY KEY,
  "passenger_id" integer NOT NULL,
  "weight" float(7),
  PRIMARY KEY ("bag_id")
);

--CREATE INDEX "Key" ON  "baggages" ("weight");

CREATE TABLE "bookings" (
  "book_id" SERIAL PRIMARY KEY,
  "customer_id" integer NOT NULL,
  "book_date" timestamp,
  "card_no" integer NOT NULL,
  "total" float(10) NOT NULL,
  "taxes" float(7) NOT NULL,
  PRIMARY KEY ("book_id")
);

--CREATE INDEX "Key" ON  "bookings" ("book_date", "card_no", "total", "taxes");

CREATE TABLE "aircrafts_in_service" (
  "aircraft_code" char(3) NOT NULL,
  "model" char(25) NOT NULL,
  PRIMARY KEY ("aircraft_code")
);




/*aircraft_details*/
INSERT INTO aircraft_details
VALUES ('Boeing 777-300', '210', True, True);
INSERT INTO aircraft_details
VALUES ('Airbus A380', '260', True, True);
INSERT INTO aircraft_details
VALUES ('Boeing 757', '150', false, True);

/*aircrafts_in_service*/
INSERT INTO aircrafts_in_service
VALUES ('700', 'Boeing 777-300');
INSERT INTO aircrafts_in_service
VALUES ('701', 'Boeing 777-300');
INSERT INTO aircrafts_in_service
VALUES ('702', 'Boeing 777-300');
INSERT INTO aircrafts_in_service
VALUES ('703', 'Boeing 777-300');
INSERT INTO aircrafts_in_service
VALUES ('704', 'Boeing 777-300');
INSERT INTO aircrafts_in_service
VALUES ('705', 'Boeing 777-300');
INSERT INTO aircrafts_in_service
VALUES ('706', 'Boeing 777-300');
INSERT INTO aircrafts_in_service
VALUES ('707', 'Boeing 777-300');
INSERT INTO aircrafts_in_service
VALUES ('708', 'Boeing 777-300');
INSERT INTO aircrafts_in_service
VALUES ('709', 'Boeing 777-300');
INSERT INTO aircrafts_in_service
VALUES ('710', 'Boeing 777-300');
INSERT INTO aircrafts_in_service
VALUES ('711', 'Boeing 777-300');
INSERT INTO aircrafts_in_service
VALUES ('712', 'Boeing 777-300');
INSERT INTO aircrafts_in_service
VALUES ('713', 'Boeing 777-300');
INSERT INTO aircrafts_in_service
VALUES ('714', 'Boeing 777-300');
INSERT INTO aircrafts_in_service
VALUES ('715', 'Boeing 777-300');
INSERT INTO aircrafts_in_service
VALUES ('716', 'Boeing 777-300');
INSERT INTO aircrafts_in_service
VALUES ('717', 'Boeing 777-300');
INSERT INTO aircrafts_in_service
VALUES ('718', 'Boeing 777-300');
INSERT INTO aircrafts_in_service
VALUES ('719', 'Boeing 777-300');
INSERT INTO aircrafts_in_service
VALUES ('720', 'Boeing 777-300');
INSERT INTO aircrafts_in_service
VALUES ('721', 'Boeing 777-300');
INSERT INTO aircrafts_in_service
VALUES ('722', 'Boeing 777-300');
INSERT INTO aircrafts_in_service
VALUES ('723', 'Boeing 777-300');
INSERT INTO aircrafts_in_service
VALUES ('724', 'Boeing 777-300');
INSERT INTO aircrafts_in_service
VALUES ('725', 'Boeing 777-300');
INSERT INTO aircrafts_in_service
VALUES ('726', 'Boeing 777-300');
INSERT INTO aircrafts_in_service
VALUES ('727', 'Boeing 777-300');
INSERT INTO aircrafts_in_service
VALUES ('728', 'Boeing 777-300');
INSERT INTO aircrafts_in_service
VALUES ('729', 'Boeing 777-300');
INSERT INTO aircrafts_in_service
VALUES ('730', 'Boeing 777-300');
INSERT INTO aircrafts_in_service
VALUES ('731', 'Boeing 777-300');
INSERT INTO aircrafts_in_service
VALUES ('732', 'Boeing 777-300');
INSERT INTO aircrafts_in_service
VALUES ('300', 'Airbus A380');
INSERT INTO aircrafts_in_service
VALUES ('301', 'Airbus A380');
INSERT INTO aircrafts_in_service
VALUES ('302', 'Airbus A380');
INSERT INTO aircrafts_in_service
VALUES ('303', 'Airbus A380');
INSERT INTO aircrafts_in_service
VALUES ('304', 'Airbus A380');
INSERT INTO aircrafts_in_service
VALUES ('305', 'Airbus A380');
INSERT INTO aircrafts_in_service
VALUES ('306', 'Airbus A380');
INSERT INTO aircrafts_in_service
VALUES ('307', 'Airbus A380');
INSERT INTO aircrafts_in_service
VALUES ('308', 'Airbus A380');
INSERT INTO aircrafts_in_service
VALUES ('309', 'Airbus A380');
INSERT INTO aircrafts_in_service
VALUES ('310', 'Airbus A380');
INSERT INTO aircrafts_in_service
VALUES ('311', 'Airbus A380');
INSERT INTO aircrafts_in_service
VALUES ('312', 'Airbus A380');
INSERT INTO aircrafts_in_service
VALUES ('313', 'Airbus A380');
INSERT INTO aircrafts_in_service
VALUES ('314', 'Airbus A380');
INSERT INTO aircrafts_in_service
VALUES ('315', 'Airbus A380');
INSERT INTO aircrafts_in_service
VALUES ('316', 'Airbus A380');
INSERT INTO aircrafts_in_service
VALUES ('317', 'Airbus A380');
INSERT INTO aircrafts_in_service
VALUES ('318', 'Airbus A380');
INSERT INTO aircrafts_in_service
VALUES ('319', 'Airbus A380');
INSERT INTO aircrafts_in_service
VALUES ('320', 'Airbus A380');
INSERT INTO aircrafts_in_service
VALUES ('321', 'Airbus A380');
INSERT INTO aircrafts_in_service
VALUES ('322', 'Airbus A380');
INSERT INTO aircrafts_in_service
VALUES ('323', 'Airbus A380');
INSERT INTO aircrafts_in_service
VALUES ('324', 'Airbus A380');
INSERT INTO aircrafts_in_service
VALUES ('325', 'Airbus A380');
INSERT INTO aircrafts_in_service
VALUES ('326', 'Airbus A380');
INSERT INTO aircrafts_in_service
VALUES ('327', 'Airbus A380');
INSERT INTO aircrafts_in_service
VALUES ('328', 'Airbus A380');
INSERT INTO aircrafts_in_service
VALUES ('329', 'Airbus A380');
INSERT INTO aircrafts_in_service
VALUES ('760', 'Boeing 757');
INSERT INTO aircrafts_in_service
VALUES ('761', 'Boeing 757');
INSERT INTO aircrafts_in_service
VALUES ('762', 'Boeing 757');
INSERT INTO aircrafts_in_service
VALUES ('763', 'Boeing 757');
INSERT INTO aircrafts_in_service
VALUES ('764', 'Boeing 757');
INSERT INTO aircrafts_in_service
VALUES ('765', 'Boeing 757');
INSERT INTO aircrafts_in_service
VALUES ('766', 'Boeing 757');
INSERT INTO aircrafts_in_service
VALUES ('767', 'Boeing 757');
INSERT INTO aircrafts_in_service
VALUES ('768', 'Boeing 757');
INSERT INTO aircrafts_in_service
VALUES ('769', 'Boeing 757');
INSERT INTO aircrafts_in_service
VALUES ('770', 'Boeing 757');
INSERT INTO aircrafts_in_service
VALUES ('771', 'Boeing 757');
INSERT INTO aircrafts_in_service
VALUES ('772', 'Boeing 757');
INSERT INTO aircrafts_in_service
VALUES ('773', 'Boeing 757');
INSERT INTO aircrafts_in_service
VALUES ('774', 'Boeing 757');
INSERT INTO aircrafts_in_service
VALUES ('775', 'Boeing 757');
INSERT INTO aircrafts_in_service
VALUES ('776', 'Boeing 757');
INSERT INTO aircrafts_in_service
VALUES ('777', 'Boeing 757');
INSERT INTO aircrafts_in_service
VALUES ('778', 'Boeing 757');
INSERT INTO aircrafts_in_service
VALUES ('779', 'Boeing 757');
INSERT INTO aircrafts_in_service
VALUES ('780', 'Boeing 757');
INSERT INTO aircrafts_in_service
VALUES ('781', 'Boeing 757');
INSERT INTO aircrafts_in_service
VALUES ('782', 'Boeing 757');
INSERT INTO aircrafts_in_service
VALUES ('783', 'Boeing 757');
INSERT INTO aircrafts_in_service
VALUES ('784', 'Boeing 757');
INSERT INTO aircrafts_in_service
VALUES ('785', 'Boeing 757');
INSERT INTO aircrafts_in_service
VALUES ('786', 'Boeing 757');
INSERT INTO aircrafts_in_service
VALUES ('787', 'Boeing 757');
INSERT INTO aircrafts_in_service
VALUES ('788', 'Boeing 757');
INSERT INTO aircrafts_in_service
VALUES ('789', 'Boeing 757');
INSERT INTO aircrafts_in_service
VALUES ('790', 'Boeing 757');
INSERT INTO aircrafts_in_service
VALUES ('791', 'Boeing 757');
INSERT INTO aircrafts_in_service
VALUES ('792', 'Boeing 757');
INSERT INTO aircrafts_in_service
VALUES ('793', 'Boeing 757');
INSERT INTO aircrafts_in_service
VALUES ('794', 'Boeing 757');
INSERT INTO aircrafts_in_service
VALUES ('795', 'Boeing 757');
INSERT INTO aircrafts_in_service
VALUES ('796', 'Boeing 757');
INSERT INTO aircrafts_in_service
VALUES ('797', 'Boeing 757');
INSERT INTO aircrafts_in_service
VALUES ('798', 'Boeing 757');

/* Gates */
INSERT INTO gates
VALUES('a0');
INSERT INTO gates
VALUES('a1');
INSERT INTO gates
VALUES('a2');
INSERT INTO gates
VALUES('a3');
INSERT INTO gates
VALUES('a4');
INSERT INTO gates
VALUES('a5');
INSERT INTO gates
VALUES('a6');
INSERT INTO gates
VALUES('a7');
INSERT INTO gates
VALUES('a8');
INSERT INTO gates
VALUES('a9');
INSERT INTO gates
VALUES('a10');
INSERT INTO gates
VALUES('a11');
INSERT INTO gates
VALUES('a12');
INSERT INTO gates
VALUES('a13');
INSERT INTO gates
VALUES('a14');
INSERT INTO gates
VALUES('a15');
INSERT INTO gates
VALUES('a16');
INSERT INTO gates
VALUES('a17');
INSERT INTO gates
VALUES('a18');
INSERT INTO gates
VALUES('a19');
INSERT INTO gates
VALUES('b0');
INSERT INTO gates
VALUES('b1');
INSERT INTO gates
VALUES('b2');
INSERT INTO gates
VALUES('b3');
INSERT INTO gates
VALUES('b4');
INSERT INTO gates
VALUES('b5');
INSERT INTO gates
VALUES('b6');
INSERT INTO gates
VALUES('b7');
INSERT INTO gates
VALUES('b8');
INSERT INTO gates
VALUES('b9');
INSERT INTO gates
VALUES('b10');
INSERT INTO gates
VALUES('b11');
INSERT INTO gates
VALUES('b12');
INSERT INTO gates
VALUES('b13');
INSERT INTO gates
VALUES('b14');
INSERT INTO gates
VALUES('b15');
INSERT INTO gates
VALUES('b16');
INSERT INTO gates
VALUES('b17');
INSERT INTO gates
VALUES('b18');
INSERT INTO gates
VALUES('b19');
INSERT INTO gates
VALUES('c0');
INSERT INTO gates
VALUES('c1');
INSERT INTO gates
VALUES('c2');
INSERT INTO gates
VALUES('c3');
INSERT INTO gates
VALUES('c4');
INSERT INTO gates
VALUES('c5');
INSERT INTO gates
VALUES('c6');
INSERT INTO gates
VALUES('c7');
INSERT INTO gates
VALUES('c8');
INSERT INTO gates
VALUES('c9');
INSERT INTO gates
VALUES('c10');
INSERT INTO gates
VALUES('c11');
INSERT INTO gates
VALUES('c12');
INSERT INTO gates
VALUES('c13');
INSERT INTO gates
VALUES('c14');
INSERT INTO gates
VALUES('c15');
INSERT INTO gates
VALUES('c16');
INSERT INTO gates
VALUES('c17');
INSERT INTO gates
VALUES('c18');
INSERT INTO gates
VALUES('c19');
INSERT INTO gates
VALUES('d0');
INSERT INTO gates
VALUES('d1');
INSERT INTO gates
VALUES('d2');
INSERT INTO gates
VALUES('d3');
INSERT INTO gates
VALUES('d4');
INSERT INTO gates
VALUES('d5');
INSERT INTO gates
VALUES('d6');
INSERT INTO gates
VALUES('d7');
INSERT INTO gates
VALUES('d8');
INSERT INTO gates
VALUES('d9');
INSERT INTO gates
VALUES('d10');
INSERT INTO gates
VALUES('d11');
INSERT INTO gates
VALUES('d12');
INSERT INTO gates
VALUES('d13');
INSERT INTO gates
VALUES('d14');
INSERT INTO gates
VALUES('d15');
INSERT INTO gates
VALUES('d16');
INSERT INTO gates
VALUES('d17');
INSERT INTO gates
VALUES('d18');
INSERT INTO gates
VALUES('d19');
INSERT INTO gates
VALUES('e0');
INSERT INTO gates
VALUES('e1');
INSERT INTO gates
VALUES('e2');
INSERT INTO gates
VALUES('e3');
INSERT INTO gates
VALUES('e4');
INSERT INTO gates
VALUES('e5');
INSERT INTO gates
VALUES('e6');
INSERT INTO gates
VALUES('e7');
INSERT INTO gates
VALUES('e8');
INSERT INTO gates
VALUES('e9');
INSERT INTO gates
VALUES('e10');
INSERT INTO gates
VALUES('e11');
INSERT INTO gates
VALUES('e12');
INSERT INTO gates
VALUES('e13');
INSERT INTO gates
VALUES('e14');
INSERT INTO gates
VALUES('e15');
INSERT INTO gates
VALUES('e16');
INSERT INTO gates
VALUES('e17');
INSERT INTO gates
VALUES('e18');
INSERT INTO gates
VALUES('e19');
INSERT INTO gates
VALUES('f0');
INSERT INTO gates
VALUES('f1');
INSERT INTO gates
VALUES('f2');
INSERT INTO gates
VALUES('f3');
INSERT INTO gates
VALUES('f4');
INSERT INTO gates
VALUES('f5');
INSERT INTO gates
VALUES('f6');
INSERT INTO gates
VALUES('f7');
INSERT INTO gates
VALUES('f8');
INSERT INTO gates
VALUES('f9');
INSERT INTO gates
VALUES('f10');
INSERT INTO gates
VALUES('f11');
INSERT INTO gates
VALUES('f12');
INSERT INTO gates
VALUES('f13');
INSERT INTO gates
VALUES('f14');
INSERT INTO gates
VALUES('f15');
INSERT INTO gates
VALUES('f16');
INSERT INTO gates
VALUES('f17');
INSERT INTO gates
VALUES('f18');
INSERT INTO gates
VALUES('f19');
INSERT INTO gates
VALUES('g0');
INSERT INTO gates
VALUES('g1');
INSERT INTO gates
VALUES('g2');
INSERT INTO gates
VALUES('g3');
INSERT INTO gates
VALUES('g4');
INSERT INTO gates
VALUES('g5');
INSERT INTO gates
VALUES('g6');
INSERT INTO gates
VALUES('g7');
INSERT INTO gates
VALUES('g8');
INSERT INTO gates
VALUES('g9');
INSERT INTO gates
VALUES('g10');
INSERT INTO gates
VALUES('g11');
INSERT INTO gates
VALUES('g12');
INSERT INTO gates
VALUES('g13');
INSERT INTO gates
VALUES('g14');
INSERT INTO gates
VALUES('g15');
INSERT INTO gates
VALUES('g16');
INSERT INTO gates
VALUES('g17');
INSERT INTO gates
VALUES('g18');
INSERT INTO gates
VALUES('g19');

/* airport */

INSERT INTO airport
VALUES ('HOU','George Bush Airport','Houston');
INSERT INTO airport
VALUES ('JFK','John F Kennedy Airport','New York');
INSERT INTO airport
VALUES ('LAX','Los Angeles Airport','Los Angeles');
INSERT INTO airport
VALUES ('ORD', 'O Hare Airport', 'Chicago');
INSERT INTO airport
VALUES ('MIA', 'Miami Airport', 'Miami');
INSERT INTO airport
VALUES ('SEA', 'Seattle-Tacoma International Airport', 'SeaTac');
INSERT INTO airport
VALUES ('SFO', 'San Francisco International Airport', 'San Mateo County');
INSERT INTO airport
VALUES ('DEN', 'Denver International Airport', 'Denver');
INSERT INTO airport
VALUES ('DFW', 'Dallas/Fort Worth International Airport', 'Dallas-Fort Worth');
INSERT INTO airport
VALUES ('ATL', 'Atlanta International Airport', 'Atlanta');

/* flights */
