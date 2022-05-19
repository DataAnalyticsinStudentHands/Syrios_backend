#!/usr/bin/env python3

import csv
import sys

if len(sys.argv) < 2:
    print("No enough arguments. Please provide a csv file to parse")
    print("Example program call python old_coin_data_new_coin_csv.py csv_file.csv")
    exit(1)

csv_data = []
with open(sys.argv[1], newline='') as csvfile:
    reader = csv.DictReader(csvfile)
    for row in reader:
        csv_data.append(row)

    csvfile.close()


def roman_to_int(s):
    roman = {'I':1,'V':5,'X':10,'L':50,'C':100,'D':500,'M':1000,'IV':4,'IX':9,'XL':40,'XC':90,'CD':400,'CM':900}
    i = 0
    num = 0
    while i < len(s):
        if i+1<len(s) and s[i:i+2] in roman:
            num+=roman[s[i:i+2]]
            i+=2
        else:
            num+=roman[s[i]]
            i+=1
    
    return num

import re

def is_roman_number(num):

    pattern = re.compile(r"""   
                                ^M{0,3}
                                (CM|CD|D?C{0,3})?
                                (XC|XL|L?X{0,3})?
                                (IX|IV|V?I{0,3})?$
            """, re.VERBOSE)

    if re.match(pattern, num):
        return True

    return False

new_csv_data = []

for row in csv_data:
    # coin_id PARSING ********************************************************************************************
    material_for_coin_id = row["Material"][row["Material"].index('(')+1:row["Material"].index(')')]
    # Gonna parse era with this variable
    era_for_coin_id = row["Era"]
    split_era_for_coin_id = era_for_coin_id.split(' ')
    roman_int = False
    for index, string in enumerate(split_era_for_coin_id):
        string = string.strip()
        if is_roman_number(string):
            roman_int = roman_to_int(string)
            del split_era_for_coin_id[index]

    era_for_coin_id = ''.join(split_era_for_coin_id) 
    if roman_int != False:
        era_for_coin_id += str(roman_int)

    # Parse reverse type for coin id
    reverse_type_coin_id = row["ReverseType"][0:row["ReverseType"].find(' ') if row["ReverseType"].find(' ') != -1 else len(row["ReverseType"])]
    coin_id = row["Mint"].lower() + '_' + material_for_coin_id + '_' + era_for_coin_id + '_' + reverse_type_coin_id
    # END coin_id PARSING ****************************************************************************************

    # mint_modern_name
    mint_modern_name = "Antakya" if row["Mint"].strip() == "Antioch" else "N/A"

    # diameter
    diameter_mm = int(row["Diameter"].strip()) if row["Diameter"].strip().isnumeric() else None

    # image name
    has_image = False
    obverse_file_uri = row["obverseFile"]
    reverse_file_uri = row["reverseFile"]
    if (".jpeg" in obverse_file_uri or
            ".jfif" in obverse_file_uri or
            ".jpg" in obverse_file_uri or
            ".tiff" in obverse_file_uri or
            ".gif" in obverse_file_uri or
            ".bmp" in obverse_file_uri or
            ".png" in obverse_file_uri or
            ".webp" in obverse_file_uri) and (".jpeg" in reverse_file_uri or
            ".jfif" in reverse_file_uri or
            ".jpg" in reverse_file_uri or
            ".tiff" in reverse_file_uri or
            ".gif" in reverse_file_uri or
            ".bmp" in reverse_file_uri or
            ".png" in reverse_file_uri or
            ".webp" in reverse_file_uri):
        has_image = True

    obverse_file_name = None
    reverse_file_name = None
    if has_image:
        obverse_file_name = obverse_file_uri[obverse_file_uri.rfind("/")+1:len(obverse_file_uri)]
        reverse_file_name = reverse_file_uri[reverse_file_uri.rfind("/")+1:len(reverse_file_uri)]

    new_row = {
            "is_incomplete": True,
            "object_type": "Coin",
            "coin_id": coin_id,
            "modern_country": "N/A",
            "ancient_territory": row["Region"],
            "mint": row["Mint"],
            "mint_nomisma_uri": None,
            "mint_modern_name": mint_modern_name,
            "longitude": None,
            "latitude": None,
            "date_range": row["Date"],
            "from_date": row["FromDate"],
            "to_date": row["ToDate"],
            "material": row["Material"],
            "denomination": row["Denomination"],
            "diameter_mm": diameter_mm,
            "governing_power": row["State"],
            "issuing_authority": row["IssuingAuthority"],
            "obverse_type": row["ObverseType"],
            "nomisma_obverse_uri": None,
            "obverse_legend": row["ObverseLegend"],
            "reverse_type": row["ReverseType"],
            "nomisma_reverse_uri": None,
            "reverse_legend": row["ReverseLegend"],
            "language": "N/A",
            "type_category": row["TypeCategory"],
            "stable_id": None,
            "wikidata": None,
            "image": has_image,
            "obverse_file_uri": row["obverseFile"],
            "reverse_file_uri": row["reverseFile"],
            "obverse_file_name": obverse_file_name,
            "reveres_file_name": reverse_file_name,
            "source_image": row["SourceImage"],
            "rights_holder": row["RightsHolder"],
            "reference1": None,
            "reference2": None,
            }

    new_csv_data.append(new_row)


import time

new_csv_file_name = 'new_coins_data_' + str(time.time()) + '.csv'
with open(new_csv_file_name, 'w', newline='') as csvfile:
    writer = csv.DictWriter(csvfile, fieldnames=new_csv_data[0].keys())

    writer.writeheader()
    for row in new_csv_data:
        writer.writerow(row)

    csvfile.close()
