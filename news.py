import requests
import nltk
import spacy
from nltk.sentiment.vader import SentimentIntensityAnalyzer
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
from nltk.stem import WordNetLemmatizer
from datetime import datetime, timedelta
from textblob import TextBlob

def get_sentiment_score(country, from_date, to_date):
    api_key = "196986ec7c644984820270a3f6b67807"
    category = "economy"
    articleTitles = []

    url = "https://newsapi.org/v2/everything?"
    arr = [0] * 3

    query_params = {
        "q": country + " " + category,
        "from": from_date,
        "to": to_date,
        "sortBy": "publishedAt",
        "language": "en",
        "apiKey": api_key
    }

    response = requests.get(url, params=query_params)
    data = response.json()
    analyzer = SentimentIntensityAnalyzer()

    if data["status"] == "ok":
        for article in data["articles"]:
            
            headline = article['title']
    
            tokens = word_tokenize(headline)
            filteredtokens = [token for token in tokens if token not in stopwords.words('english')]
            lemmatizer = WordNetLemmatizer()
            lemmatizedtokens = [lemmatizer.lemmatize(token) for token in filteredtokens]
            processedtext = ' '.join(lemmatizedtokens)
            sentiment = analyzer.polarity_scores(processedtext)

            if (sentiment["neg"] <= 0.6 and sentiment["neu"] <= .6 and sentiment["pos"] <= .6):
                continue
            arr[0] += round(10.0 * sentiment["neg"])
            arr[1] += round(10.0 * sentiment["neu"])
            arr[2] += round(10.0 * sentiment["pos"])
            articleTitles.append(headline)
    else:
        print("Failed to fetch the news")


    avg = (arr[0] * -1) + arr[2]
    keptarticlecount = len(articleTitles)
    avg /= (keptarticlecount * 10)
    avg = (arr[0] * -1) + arr[2]
    avg /= (sum(arr))

    titlesString = '\n'.join(articleTitles)
    return avg, keptarticlecount, titlesString

from_date = (datetime.now() - timedelta(days=5)).strftime('%Y-%m-%d')  # Last 30 days
to_date = datetime.now().strftime('%Y-%m-%d')
print(get_sentiment_score('us',from_date, to_date )[2])