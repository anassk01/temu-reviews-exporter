# temu-reviews-importer

The ReviewExtractor class allows for extracting review information from a webpage and exporting it in either CSV or JSON format. Below are the key methods and functionalities of this script:

ReviewExtractor Class
Constructor: Initializes an empty array (extractedInfo) to store the extracted review information.
extractReviewInfo() Method
Description: Extracts review information from the specified elements on the webpage.
Data Extracted:
- Author Name
- Author Image
- Country Image
- Review Date
- Stars (represented by ⭐)
- Images (URLs joined as a string)
- Body Text


- convertJsonToCsv() Method

Description: Converts the extracted review information into a CSV format.
Output: Returns a CSV-formatted string that can be downloaded as a file.
- downloadCsv() Method
Description: Initiates the download of review information in CSV format.
Functionality:
- Calls extractReviewInfo() to populate extractedInfo.
- Converts review information to CSV using convertJsonToCsv().
- Creates a downloadable link for the CSV file.


- convertJsonToJsonString() Method

Description: 
- Converts the extracted review information into a JSON string.
- Output: Returns a JSON-formatted string containing the review information.
- downloadJson() Method
Description: Initiates the download of review information in JSON format.
Functionality:
- Calls extractReviewInfo() to populate extractedInfo.
- Converts review information to JSON using convertJsonToJsonString().
- Creates a downloadable link for the JSON file.
  
Additional Features

- Dynamically creates buttons for downloading CSV and JSON files.
- Adds event listeners to the buttons to trigger the download functionality.
- Inserts buttons into the DOM after a specified target element.

  
By using this script, you can efficiently extract, convert, and download reviews from a webpage in either CSV or JSON format with just a click of a button.

