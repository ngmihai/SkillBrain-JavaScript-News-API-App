const categoryLabel = document.getElementById("category-label");
const listNews = document.getElementById("list");

const categories = [
  "all",
  "business",
  "sports",
  "world",
  "politics",
  "technology",
  "startup",
  "entertainment",
  "miscellaneous",
  "hatke",
  "science",
  "automobile",
];

class News {
  constructor(
    author,
    content,
    date,
    id,
    imageUrl,
    readMoreUrl,
    time,
    title,
    url
  ) {
    this.author = author;
    this.content = content;
    this.date = date;
    this.id = id;
    this.imageUrl = imageUrl;
    this.readMoreUrl = readMoreUrl;
    this.time = time;
    this.title = title;
    this.url = url;
  }

  renderNews = () => {
    const li = document.createElement("li");
    li.className = "listItem";

    li.innerHTML = `
      <img src=${this.imageUrl} alt=${this.title} class="image" />
      <div>
        <span>Title: ${this.title}</span>
        <a target="_blank" href=${this.url}>Read More...</a>
      </div>
    `;

    return li;
  };
}

const updateCategoryLabel = (category) => {
  categoryLabel.innerText = `Category: ${category}`;
};

const createNews = (newsArray) => {
  const news = newsArray.map((newsValue) => {
    return new News(
      newsValue.author,
      newsValue.content,
      newsValue.date,
      newsValue.id,
      newsValue.imageUrl,
      newsValue.readMoreUrl,
      newsValue.time,
      newsValue.title,
      newsValue.url
    );
  });

  return news;
};

const getNewsInfo = async (category) => {
  const response = await fetch(
    `https://inshorts.deta.dev/news?category=${category}`
  );
  const data = await response.json();

  return data;
};

const loadNews = async () => {
  const newsInfo = await getNewsInfo("automobile");
  const { category, data: newsArray } = newsInfo;

  updateCategoryLabel(category);
  const news = createNews(newsArray);

  news.forEach((newsValue) => {
    const newLiElement = newsValue.renderNews();
    listNews.append(newLiElement);
  });
};

loadNews();
