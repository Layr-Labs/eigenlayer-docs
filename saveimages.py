import os
import requests
from urllib.parse import urlparse

# Function to download an image from a URL
def download_image(url, folder_path, index):
    response = requests.get(url)
    if response.status_code == 200:
        # Extract the file name from the URL
        file_name = os.path.join(folder_path, f"image_{index}.png")
        with open(file_name, 'wb') as file:
            file.write(response.content)
        print(f"Downloaded: {url}")
    else:
        print(f"Failed to download: {url}")

# Function to search for URLs with "googleusercontent.com"
def find_and_download_images(start_folder):
    image_folder = os.path.join(start_folder, 'image-saves')
    
    # Create the image folder if it doesn't exist
    if not os.path.exists(image_folder):
        os.makedirs(image_folder)

    # Counter to keep track of downloaded images
    index = 1

    # Walk through the directory tree
    for root, dirs, files in os.walk(start_folder):
        for file in files:
            # Check if the file is a text file (you can customize this check)
            if file.endswith(".md"):
                file_path = os.path.join(root, file)
                
                # Read each line in the file
                with open(file_path, 'r') as text_file:
                    for line in text_file:
                        # Check if the URL contains "googleusercontent.com"
                        if "googleusercontent.com" in line:

                            # Parse a valid URL from the line
                            parsed_url = urlparse(line.strip())
                    
                            # Download the image
                            print("URL found: ", parsed_url.domain)
                            # download_image(parsed_url.geturl(), image_folder, index)
                            index += 1

# Specify the starting folder
start_folder = "."  # Change this to the desired starting folder

# Call the function to find and download images
find_and_download_images(start_folder)
