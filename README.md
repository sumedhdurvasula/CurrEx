https://currex.vercel.app/

Currently Supports the Following Countries: UK, Switzerland, Australia, Japan, Canada

https://devfolio.co/projects/currex-217f

## The problem CurrEx solves
Currency exchange rates are not only fundamental benchmarks of a nation's economic health but also crucial determinants for global investors seeking lucrative opportunities. Before committing capital to ventures abroad, investors meticulously assess the stability and trajectory of currency values, as volatile exchange rates can significantly impact investment returns. However, accurately predicting currency fluctuations remains a daunting task, compounded by the intricate interplay of economic, political, and market factors.

Despite the growing prominence of the foreign exchange (forex) market, there is a lack of comprehensive research and reliable forecasting mechanisms. This lack of insight leaves investors vulnerable to unforeseen currency changes, hindering informed decision-making and exacerbating financial risks. Consequently, investors often rely on speculative strategies or market sentiment, further amplifying market volatility and uncertainty.

Beyond the realm of finance, ordinary citizens planning overseas purchases or travel also stand to benefit from a favorable currency exchange environment. An increasing domestic currency relative to foreign ones can increase purchasing power abroad, enabling individuals to acquire goods, services, or properties at more favorable rates. This currency appreciation not only enhances the affordability of international transactions but also stimulates cross-border trade and tourism, fostering economic growth and prosperity.

In the realm of global finance, the lack of reliable forecasting mechanisms in the forex market poses significant challenges, leaving investors vulnerable to unpredictable currency fluctuations. CurrEx addresses this by leveraging advanced predictive algorithms to empower users with precise forecasts of future exchange rates, so that investors and citizens do not have to worry about making risky finacial investments.

## Challenges we ran into
Our primary hurdle arose when integrating our sentiment analysis tool. We encountered multiple errors while querying the News API, initially receiving insufficient articles and struggling to ensure headline relevance. To overcome these challenges, we delved into in-depth research on News API endpoints and adjusted our URL accordingly. Additionally, we encountered difficulties with the country tag functionality. However, we devised a workaround by modifying our search query to explicitly include the country name, enabling us to obtain accurate sentiment analysis for targeted regions.

We encountered another challenge when we initially sought to construct our own dataset by leveraging multiple APIs. However, we soon realized that many of these APIs lacked the specific metrics essential for our analysis. Consequently, we shifted our focus towards finding existing datasets. The OECD emerged as an invaluable resource in this endeavor, offering a wealth of free databases covering numerous countries. Despite this resource proving its usefulness it was still challenging to find the specific metrics we needed and the only way to accomplish this was by combing through several websites until we found multiple appropriate datasets.

Finally, we also experienced difficulties with our model. Specifically, our model did not have a high accuracy and we were stumped initially as to why this could be the case. We found the most likely reason was that our model did not take into account enough features. This prompted us to find other relevant features. We then used gold per ounce prices over time and government national debt over time. After implementing these features we still found that our model was not producing the accuracy score that we wanted and we realized this could be because of our randomized grid search. We then removed this and found our model performed much better and we hypertuned our parameters after and achieved our best least MSE of 0.000497.
