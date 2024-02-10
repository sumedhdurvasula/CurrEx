from flask import Flask, jsonify
from flask_cors import CORS, cross_origin
from flask import request
from news import get_sentiment_score
from datetime import datetime, timedelta

app = Flask(__name__)
CORS(app)

@app.route('/hello', methods=['POST'])
@cross_origin()
def hello():
    from_date = (datetime.now() - timedelta(days=15)).strftime('%Y-%m-%d')
    to_date = datetime.now().strftime('%Y-%m-%d')
    headlines = get_sentiment_score('us',from_date, to_date )[2]
    return headlines

if __name__ == '__main__':
    app.run(debug=True)