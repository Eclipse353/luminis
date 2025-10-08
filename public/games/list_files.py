import os

folder_path = "."  # current folder
files = os.listdir(folder_path)
for f in files:
    print(f)
