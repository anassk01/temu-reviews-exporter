class ReviewExtractor {
    constructor() {
        this.extractedInfo = [];
        this.reviews = document.querySelectorAll('#reviewContent > div._3mn9Y0tf > div._2OaJDN8Y._3Rsl6Owq._1xAk_zzX > div._10EiyDKr._3hjIP4Y2._2gC1sYKf.HVCrPqZh > div > div > div > div:nth-child(3) > div > div > div');
    }

    extractReviewInfo() {
        this.reviews.forEach((review) => {
            const authorNameElement = review.querySelector('.XTEkYdlM._3a8V1xkt');
            const authorName = authorNameElement ? authorNameElement.textContent : '';
            
            const authorImageElement = review.querySelector('.M-mQ_cI0 img');
            const authorImage = authorImageElement ? authorImageElement.src : '';
            
            const countryImageElement = review.querySelector('div.jr_zeQBk._2RiUeNfG > span:nth-child(2) > img');
            const countryImage = countryImageElement ? countryImageElement.src : '';

            const reviewDateElement = review.querySelector('div.jr_zeQBk._2RiUeNfG > span:nth-child(3)');
            const reviewDate = reviewDateElement ? reviewDateElement.innerText : '';

            const starIcons = review.querySelectorAll('.ZJF4Fxlw svg');
            const numOfStars = starIcons.length;
            const starEmoji = '⭐'.repeat(numOfStars);

            const bodyImages = review.querySelectorAll('.splide__list img');
            const imageUrls = Array.from(bodyImages).map(img => img.src);

            const bodyTextElement = review.querySelector('span._2EO0yd2j');
            const bodyText = bodyTextElement ? bodyTextElement.textContent : '';

            this.extractedInfo.push({
                'Author Name': authorName,
                'Author Image': authorImage,
                'Country Image': countryImage,
                'Review Date': reviewDate,
                'Stars': starEmoji,
                'Images': imageUrls.join(';'), // Join image URLs as a string
                'Body Text': bodyText
            });
        });
    }

    convertJsonToCsv() {
        this.extractReviewInfo(); // Extract review info before converting to CSV
        const csvContent = "data:text/csv;charset=utf-8," 
            + "Author Name,Author Image,Country Image,Review Date,Stars,Images,Body Text\n"
            + this.extractedInfo.map(item => {
                return `"${item['Author Name']}","${item['Author Image']}","${item['Country Image']}","${item['Review Date']}","${item.Stars}","${item.Images}","${item['Body Text']}"`;
            }).join("\n");

        return encodeURI(csvContent);
    }

    downloadCsv() {
        const csvData = this.convertJsonToCsv();
        const link = document.createElement('a');
        link.setAttribute('href', csvData);
        link.setAttribute('download', 'reviews.csv');
        document.body.appendChild(link);
        link.click();
    }

    convertJsonToJsonString() {
        this.extractReviewInfo(); // Extract review info before converting to JSON
        return JSON.stringify(this.extractedInfo);
    }

    downloadJson() {
        const jsonData = this.convertJsonToJsonString();
        const blob = new Blob([jsonData], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.setAttribute('href', url);
        link.setAttribute('download', 'reviews.json');
        document.body.appendChild(link);
        link.click();
    }
}

// Create an instance of ReviewExtractor
const reviewExtractor = new ReviewExtractor();

// Dynamically create buttons and add them to the DOM after the target element
const csvButton = document.createElement('button');
csvButton.textContent = 'Download CSV';
csvButton.addEventListener('click', () => reviewExtractor.downloadCsv());

const jsonButton = document.createElement('button');
jsonButton.textContent = 'Download JSON';
jsonButton.addEventListener('click', () => reviewExtractor.downloadJson());

const targetDiv = document.querySelector('div._39vL3TE4');
targetDiv.insertAdjacentElement('afterend', document.createElement('br'));
targetDiv.insertAdjacentElement('afterend', jsonButton);
targetDiv.insertAdjacentElement('afterend', document.createElement('br'));
targetDiv.insertAdjacentElement('afterend', csvButton);
