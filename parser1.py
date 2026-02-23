from bs4 import BeautifulSoup
from time import sleep
import json
import os
import requests
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from webdriver_manager.chrome import ChromeDriverManager

options = Options()
options.add_argument("--no-sandbox")
options.add_argument("--disable-dev-shm-usage")

driver = webdriver.Chrome(service=Service(ChromeDriverManager().install()), options=options)
# Scraping part
url = "https://www.err.ee/"

if os.path.exists("output.json"):
    with open("output.json", "r", encoding="utf-8") as f:
        try:
            output_data = json.load(f)
        except json.JSONDecodeError:
            output_data = []
else:
    output_data = []

existing_urls = {item['url'] for item in output_data}

output_data = []

driver.get(url)
sleep(2)

response = driver.page_source
soup = BeautifulSoup(response, "html.parser")


def safe_text(e):
    return e.get_text(strip=True) if e else None


for div in soup.find_all('div', class_='flex-row marker1 blc-threeblc'):
    articles = div.find_all('article')

    for article in articles:
        url = article.find('a')
        if "https:" in url['href']:
            href = url['href']
        else:
            href = "https:" + url['href']

        if href in existing_urls:
            print(f"Skipping existing URL: {href})")
            continue

        image_url = article.find('img').get('src')
        if "https:" in image_url:
            image_url_full = image_url
        else:
            image_url_full = "https:" + image_url

        name = article.find('h2', class_='header-font three-font').get_text(strip=True)


        print([name, href, image_url_full])

        driver.get(href)

        sleep(2)
        article_soup = BeautifulSoup(driver.page_source, "html.parser")
        category = safe_text(article_soup.find('div', class_='category'))
        pubdate = safe_text(article_soup.find('time', class_='pubdate ng-binding'))
        figcaption = safe_text(article_soup.find('figcaption'))
        
        print([category, pubdate, figcaption]) 

        api_url = "http://localhost:3000/articles"

        data = {
            "name": name,
            "url": href,
            "image_url": image_url_full,
            "category": category,
            "pubdate": pubdate,
            "content": figcaption,
            "source": "err.ee"
        }

        try:
            response = requests.post(api_url, json=data)
            print("Sent to backend:", response.status_code)
        except Exception as e:
            print("Error sending to backend:", e)

driver.quit()
print("Scraping and insertion complete.")
