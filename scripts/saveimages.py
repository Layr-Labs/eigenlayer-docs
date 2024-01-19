import re
import os
import requests
from urllib.parse import urlparse

counter = 0

def extract_valid_url_from_image_tag(text):
    # Use regular expression to find the URL in the image tag
    match = re.search(r'\(([^)]+)\)', text)
    
    if match:
        # Extract the URL from the matched group
        url_in_brackets = match.group(1)
        
        # Parse a valid URL from the extracted part
        parsed_url = urlparse(url_in_brackets)
        
        # Check if the parsed URL is valid
        if parsed_url.scheme and parsed_url.netloc:
            return parsed_url.geturl()  # Return the valid URL




# Function to download an image from a URL
def download_image(url, folder_path, file_path):
    print("Trying to download:", url)
    global counter
    print("Counter: ", counter)

    response = requests.get(url)
    if response.status_code == 200:
        # Extract the file name from the URL
        file_name = os.path.join(folder_path, file_path+".png")
        with open(file_name, 'wb') as file:
            file.write(response.content)
        print(f"Downloaded: {url}")
    else:
        print(f"Failed to download: {url}")

# Function to search for URLs with "googleusercontent.com"
def find_and_download_images(start_folder):
    image_folder = os.path.join(start_folder, '../static/img/googleusercontentbackup')
    
    # Create the image folder if it doesn't exist
    if not os.path.exists(image_folder):
        os.makedirs(image_folder)

  

    # Walk through the directory tree
    for root, dirs, files in os.walk(start_folder):
        for file in files:
            # Check if the file is a text file (you can customize this check)
            if file.endswith(".md"):
                file_path = os.path.join(root, file)
                
                
                # Read each line in the file
                with open(file_path, 'r') as text_file:
                    for line in text_file:
                        if "googleusercontent.com" in line and "None" not in line:
                            #print("line in text file: ", line)
                            # Check if the URL contains "googleusercontent.com"
                            parsed_url = extract_valid_url_from_image_tag(line.strip())
                            #print("Parsed URL with googleusercontents: ", parsed_url)
                            
                            # Extract the file path
                            file_path = urlparse(parsed_url).path[1:]
                            
                            global counter 
                            counter += 1
                            # print("Counter: ", counter)
                            # print ("file path: ", file_path)
                            # Download the image
                            download_image(parsed_url, image_folder, file_path)
                           
                            
                            
                            

# Specify the starting folder
start_folder = "."  # Change this to the desired starting folder

# Call the function to find and download images
find_and_download_images(start_folder)
