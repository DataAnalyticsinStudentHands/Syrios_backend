#!/usr/bin/env python3

import csv
import sys
import argparse
import psycopg2



# ONLY WORKS ON PYTHON 3.10. They introduced pattern matching now
if sys.version_info < (3, 10):
    print('Python version 3.10.x or higher required\nAborting')
    sys.exit()

parser = argparse.ArgumentParser()
parser.add_argument('-pg', '--pg-connection-string', dest='pg_string', help='Connection string to database. This program will only do reads on the database to check what relations need to be considered for the csv file(s).')
parser.add_argument('-f', '--csv-file', dest='csv_file_name', help='Name of the csv file to parse')

args = parser.parse_args()

pg_string = args.pg_string
csv_file_name = args.csv_file_name

if pg_string == None:
    print('Missing pg_string. This program will only do reads on the database to check what relations need to be considered for the csv file(s). Please input a pg string.')
    pg_string = input()

if csv_file_name == None:
    print('Missing csv_file_name. This program needs a csv file to parse. Please input one now.')
    csv_file_name = input()

###### prep data for insertion to database ######
csv_data = []
with open(csv_file_name, newline='') as csvfile:
    reader = csv.DictReader(csvfile)
    for row in reader:
        csv_data.append(row)

    csvfile.close()

conn = psycopg2.connect(pg_string)
cursor = conn.cursor()
cursor.execute("SELECT id, governing_power FROM governing_powers;")
governing_powers = cursor.fetchall()

coins_governing_power_links = []
for data in csv_data:
    has_relation = False
    for governing_power in governing_powers:
        if data['governing_power'] == governing_power[1]:
            coins_governing_power_links.append({
                'coin_id': data['id'],
                'governing_power_id': governing_power[0]
                })
            has_relation = True

        if data['governing_power'] == 'Roman Empire' and governing_power[1] == 'Roman Principate':
            coins_governing_power_links.append({
                'coin_id': data['id'],
                'governing_power_id': governing_power[0],
                })
            has_relation = True

        if data['governing_power'] == 'Roman Republic to Empire' and governing_power[1] == 'Roman (uncertain)':
            coins_governing_power_links.append({
                'coin_id': data['id'],
                'governing_power_id': governing_power[0],
                })
            has_relation = True

        if has_relation:
            break

    if not has_relation:
        print("No relation to governing_power with coin: ", data)




transaction_string = """
BEGIN;
INSERT INTO coins_governing_power_links (coin_id, governing_power_id)
VALUES
"""

for index, cgpl in enumerate(coins_governing_power_links):
    if index == len(coins_governing_power_links)-1:
        transaction_string += '\t(' + str(cgpl['coin_id']) + ', ' + str(cgpl['governing_power_id']) + ');\n'
    else:
        transaction_string += '\t(' + str(cgpl['coin_id']) + ', ' + str(cgpl['governing_power_id']) + '),\n'

# Testing
#transaction_string += 'ROLLBACK;'
# Commiting
transaction_string += 'COMMIT;'

cursor.execute(transaction_string)
