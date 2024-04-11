import pandas as pd

def load_language_mappings():
    language_mappings = pd.read_csv("FLORES_200_LANG_MAPPING.csv", index_col=0, header=None).to_dict()[1]

    return language_mappings