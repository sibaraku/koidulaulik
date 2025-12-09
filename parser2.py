from selenium import webdriver
from bs4 import BeautifulSoup
from time import sleep
import json
import os
from urllib.parse import urljoin

# Scraping part
url = "https://culture.ee/en/blog/"

if os.path.exists("blog.json"):
    with open("blog.json", "r", encoding="utf-8") as f:
        try:
            output_data = json.load(f)
        except json.JSONDecodeError:
            output_data = []
else:
    output_data = []

existing_urls = {item['url'] for item in output_data}

driver = webdriver.Chrome()
output_data = []

driver.get(url)
sleep(2)

response = driver.page_source
soup = BeautifulSoup(response, "html.parser")


def safe_text(e):
    return e.get_text(strip=True) if e else None

def get_posts(url):
    driver.get(next_url)
    sleep(2)
    post_response = driver.page_source
    soup = BeautifulSoup(post_response, "html.parser")

    posts = soup.find_all(class_="blog-card")
    print(len(posts))
    for post in posts:
        title = post.find("h3").get_text(strip=True)
        link = post.find("a", class_="more-link")['href']
        link = "https://culture.ee" + link if not link.startswith("http") else link
        if link in existing_urls:
            print(f"Skipping existing URL: {link})")
            continue

        img_tag = post.find("img")
        img_url = img_tag['src'] if img_tag else None
        img_url = "https://culture.ee" + img_url if img_url and not img_url.startswith("http") else img_url

        driver.get(link)
        sleep(2)
        post_response = driver.page_source
        soup = BeautifulSoup(post_response, "html.parser")
        
        content = soup.find(class_="post-content__inner").get_text(strip=True)

        item = {
            "name": title,
            "url": link,
            "image_url": img_url,
            "content": content
        }
        output_data.append(item)
        with open("blog.json", "w", encoding="utf-8") as f:
            json.dump(output_data, f, ensure_ascii=False, indent=4)
        existing_urls.add(link)
        print(f"Added: {title}, {link}, {img_url}, {content:30}...")
        driver.back()
        sleep(2)


while True:
    next_btn = soup.find("a", class_="pagination__button--next")
    
    if next_btn:
        next_url = urljoin(url, next_btn['href'])
        driver.get(next_url)
        get_posts(next_url)
        print("Navigated to next page:", next_url)
    else:
        print("No more pages to scrape.")
        break

# driver.quit()
print("Scraping and insertion complete.")
