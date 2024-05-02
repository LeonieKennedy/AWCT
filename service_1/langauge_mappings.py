import pandas as pd

def load_language_mappings():
<<<<<<< HEAD
    df = pd.read_csv("FLORES_200_LANG_MAPPING.csv", index_col=0, header=None, skipinitialspace=True)
    language_mappings = {key.strip(): value.strip() for key, value in df[1].to_dict().items()}
    return language_mappings

mappings = load_language_mappings()
=======
    language_mappings = pd.read_csv("FLORES_200_LANG_MAPPING.csv", index_col=0, header=None).to_dict()[1]

    return language_mappings
>>>>>>> c787479d6ba7f7fe594bdbde30b87c85e2048cce
