#!/usr/bin/env python3

import psycopg2
import csv
import argparse
import sys
import os
import time
import math

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

csv_data = []
with open(csv_file_name, newline='') as csvfile:
    reader = csv.DictReader(csvfile)
    for row in reader:
        csv_data.append(row)

    csvfile.close()

sorted(csv_data, key=lambda d: d['is_incomplete'])

conn = psycopg2.connect(pg_string)
cursor = conn.cursor()
cursor.execute("""SELECT table_name 
  FROM information_schema.tables
 WHERE table_schema='public'
   AND table_type='BASE TABLE';""")
table_data = cursor.fetchall()

coins_table_info = None
coins_content = None
files_table_info = None
files_content = None 
files_related_morphs_table_info = None
files_related_morphs_content = None
coins_components_table_info = None
coins_components_content = None
type_category_table_info = None
type_category_content = None
for table in table_data:
    table_name = table[0]

    sql_table_string = """SELECT column_name, column_default, data_type
            FROM information_schema.columns
            WHERE table_schema = 'public'
            AND table_name = '""" + table_name + "';"

    sql_info_string = """
    SELECT *
    FROM """ + table_name + ";"

    match table_name:
        case "coins_components":
            cursor.execute(sql_table_string)
            coins_components_table_info = cursor.fetchall()
            cursor.execute(sql_info_string)
            coins_content = cursor.fetchall()
        case "files":
            cursor.execute(sql_table_string)
            files_table_info = cursor.fetchall()
            cursor.execute("""
            SELECT id, name
            FROM files;""")
            files_content = cursor.fetchall()
        case "files_related_morphs":
            cursor.execute(sql_table_string)
            files_related_morphs = cursor.fetchall()
            cursor.execute(sql_info_string)
            files_related_morphs_content = cursor.fetchall()
        case "coins":
            cursor.execute(sql_table_string)
            coins_table_info = cursor.fetchall()
            cursor.execute("""
            SELECT coin_id
            FROM coins;""")
            coins_content = cursor.fetchall()
        case "components_miscellaneous_type_categories":
            cursor.execute(sql_table_string)
            coins_table_info = cursor.fetchall()
            cursor.execute(sql_info_string)
            type_category_content = cursor.fetchall()

for coin in coins_content:
    for index, row in enumerate(csv_data):
        if row["coin_id"] == coin:
            while True:
                print("Duplicate coin_id from database to csv script. Please input new coin_id")
                new_coin_id = input()

                new_coin_id_is_duplicate = False
                for i_row in enumerate(csv_data):
                    if i_row["coin_id"] == coin:
                        print("new coin_id that was just entered is also a duplicate. Please input another new coin_id")
                        new_coin_id_is_duplicate = True

                if not new_coin_id_is_duplicate:
                    csv_data[index]["coin_id"] = new_coin_id
                    break



cursor.execute("BEGIN;")

for coin in csv_data:
    if coin["date_range"][0] == '"' and coin["date_range"][-1] == '"':
        coin["date_range"] = coin["date_range"][1:-1]
    if coin["obverse_type"][0] == '"' and coin["obverse_type"][-1] == '"':
        coin["obverse_type"] = coin["obverse_type"][1:-1]
    if coin["obverse_legend"][0] == '"' and coin["obverse_legend"][-1] == '"':
        coin["obverse_legend"] = coin["obverse_legend"][1:-1]
    if coin["reverse_type"][0] == '"' and coin["reverse_type"][-1] == '"':
        coin["reverse_type"] = coin["reverse_type"][1:-1]
    if coin["reverse_legend"][0] == '"' and coin["reverse_legend"][-1] == '"':
        coin["reverse_legend"] = coin["reverse_legend"][1:-1]
    cursor.execute("""
    INSERT INTO coins
    (coin_id, modern_country, ancient_territory, mint, mint_nomisma_uri, mint_modern_name, longitude, latitude, date_range, from_date, to_date, material, denomination, diameter, governing_power, issuing_authority, obverse_type, nomisma_obverse_uri, obverse_legend, reverse_type, nomisma_reverse_uri, reverse_legend, language, stable_id, wikidata, has_image, source_image, right_holder, ref_1, ref_2)
    VALUES ('""" + coin["coin_id"] + "', '" + 
    coin["modern_country"] + "', '" +
    coin["ancient_territory"] + "', '" +
    coin["mint"] + "', '" +
    coin["mint_nomisma_uri"] + "', '" +
    coin["mint_modern_name"] + "', '" +
    coin["longitude"] + "', '" + 
    coin["latitude"] + "', '" + 
    coin["date_range"] + "', '" + 
    coin["from_date"] + "', '" + 
    coin["to_date"] + "', '" + 
    coin["material"] + "', '" + 
    coin["denomination"] + "', " + 
    str(coin["diameter_mm"] if coin["diameter_mm"].isnumeric() else 'NULL') + ", '" + 
    coin["governing_power"] + "', '" + 
    coin["issuing_authority"] + "', '" + 
    coin["obverse_type"] + "', '" + 
    coin["nomisma_obverse_uri"] + "', '" + 
    coin["obverse_legend"] + "', '" + 
    coin["reverse_type"] + "', '" + 
    coin["nomisma_reverse_uri"] + "', '" + 
    coin["reverse_legend"] + "', '" + 
    coin["language"] + "', '" + 
    coin["stable_id"] + "', '" + 
    coin["wikidata"] + "', '" + 
    coin["image"] + "', '" + 
    coin["source_image"] + "', '" + 
    coin["rights_holder"] + "', '" + 
    coin["reference1"] + "', '" + 
    coin["reference2"] + "') RETURNING id;")
    coin_table_id = cursor.fetchall()[0][0]

    type_category_ids = []
    for types in coin["type_category"].split(','):
        types = types.strip()
        cursor.execute("INSERT INTO components_miscellaneous_type_categories (type_category) VALUES ('" + types + "') RETURNING id;")
        type_category_id = cursor.fetchall()[0]
        type_category_ids.append(type_category_id[0])

    for index, type_category_id in enumerate(type_category_ids):
        sql_query = "INSERT INTO coins_components VALUES ((SELECT max(id) FROM coins_components) + 1, " + str(coin_table_id) + ", " + str(type_category_id) + ", 'miscellaneous.type-category', 'type_category', " + str(index + 1) + " );"
        cursor.execute(sql_query)

    obverse_id = None
    reverse_id = None
    for file_info in files_content:
        if coin["obverse_file_name"] == file_info[1]:
            obverse_id = file_info[0]
        if coin["reverse_file_name"] == file_info[1]:
            reverse_id = file_info[0]

    if obverse_id == None or reverse_id == None:
        continue

    cursor.execute("INSERT INTO files_related_morphs VALUES (" + str(obverse_id) + ", " + str(coin_table_id) + ", 'api::coin.coin', 'obverse_file', 1 );")
    cursor.execute("INSERT INTO files_related_morphs VALUES (" + str(reverse_id) + ", " + str(coin_table_id) + ", 'api::coin.coin', 'reverse_file', 1 );")

#cursor.execute("ROLLBACK;") # ROLLBACK for testing
cursor.execute("COMMIT;") # For production
